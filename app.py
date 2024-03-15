from flask import Flask, jsonify, request
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS
import pickle
import requests
from bs4 import BeautifulSoup
import json
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/movies')
def index():
    data = request.args.get('movie')
    movies = pickle.load(open('movies.pkl','rb'))
    
    result = []
    for key, movie in movies['movie'].items():
        if data.lower() in movie.lower():
            result.append({'movie': movie, 'movie_id': movies['movie_id'].get(key, '')})
    return jsonify(result)

@app.route('/predict')
def perdict():
    x = request.args.get('movie_name')
    df = pickle.load(open('dataframe.pkl','rb'))
    vectors = pickle.load(open('vectors.pkl','rb'))
    cv = pickle.load(open('counter.pkl','rb'))
    
    about = df[df['movie_id']==x]
    about_index = about.index[0]
    new_df = df.iloc[about_index]
    
    user_vector = cv.transform([new_df['tags']])
    similarities = cosine_similarity(user_vector, vectors)
    similarities = similarities[0] * 100
    final_similars = list(enumerate(similarities))
    final_similars = sorted(final_similars,reverse=True, key= lambda x : x[1])[1:6]
    finals = []
    for tuple in final_similars:
        index = tuple[0]
        temp = df.iloc[index]
        temp = {
            'movie_id': temp['movie_id'],
            'movie_name': temp['movie_name'],
            'movie': temp['movie'],
            'percentage': round(tuple[1], 2)
        }
        finals.append(temp)
    return jsonify(finals)

@app.route('/get-details')
def get_details():
    ttid = request.args.get('id')
    df = pickle.load(open('dataframe.pkl','rb'))
    
    about = df[df['movie_id']==ttid]
    about_index = about.index[0]
    new_df = df.iloc[about_index]
    new_df = new_df.to_dict()
    
    headers={'User-Agent':'Mozilla/5.0 (Windows NT 6.3; Win 64 ; x64) Apple WeKit /537.36(KHTML , like Gecko) Chrome/80.0.3987.162 Safari/537.36'} 
    data = requests.get(f"https://www.imdb.com/title/{ttid}/", headers=headers).text
    soup = BeautifulSoup(data, 'lxml')
    
    filmfare = soup.find_all('div', class_='ipc-html-content-inner-div')
    music_by = soup.find_all("div", class_='ipc-html-content-inner-div')
    actors = soup.find_all('div', class_='sc-bfec09a1-5')
    
    description = soup.find_all('span', class_='sc-466bb6c-2 chnFO')
    if(description):
        description = description[0].text
        
    big_awards = soup.find('span', class_='ipc-metadata-list-item__list-content-item')
    if big_awards is not None:
        big_awards = big_awards.text
        
    amazon_award = None  
    for film in filmfare:
        film = film.find_all('a', class_='ipc-link ipc-link--base')
        if film :
            if film[0].text.find('Amazon') > -1:
                amazon_award = film[0].text
    music_data = []
    for music in music_by:
        if music.find('span'):
            for str in music:
                music_data.append(str.text)
            break
        
    rating_people = soup.find_all('div', class_='sc-bde20123-3')
    if(rating_people):
        rating_people = rating_people[0].text
        
    rating = None
    rating_html = soup.find_all('script', type='application/ld+json')
    if(rating_html):
        rating_html = rating_html[0].string
        rating = json.loads(rating_html)
        if rating:
            rating = rating.get('aggregateRating', {}).get('ratingValue', None)
            
    poster_html = soup.find_all('script', type='application/ld+json')
    if poster_html:
        rating_json = json.loads(poster_html[0].string)
        if(rating_json):
            poster = rating_json.get('image', None)
    director_html = soup.find_all('a', class_="ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link")
    if director_html:
        director = director_html[0].text
    titles = soup.find_all('a', class_='ipc-chip--on-baseAlt')
    title_data = []
    for x in titles:
        title_data.append(x.text)
        
    star_html = soup.find_all('li', class_='ipc-metadata-list-item--link')
    writer_html = soup.find_all('li', class_='ipc-metadata-list__item')
    
    final_writers = []
    for writers in writer_html:
        if (writers.text.find('Writers') > -1):
            for writer in writers.find_all('a', class_='ipc-metadata-list-item__list-content-item--link'):
                final_writers.append(writer.text)
            break
    
    final_stars = []
    for star in star_html:
        if(star.text.find('Stars') > -1):
            for stars in star.find_all('a', class_='ipc-metadata-list-item__list-content-item--link'):
                final_stars.append(stars.text)
            break
    
    actors_data = []
    for actor in actors:
        name = actor.find('a', class_='sc-bfec09a1-1').text
        character = actor.find('a', class_='sc-bfec09a1-2')
        if character is not None:
            character = character.text
        else:
            character = None
        img = actor.find('img')
        image = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
        if img is not None:
            image = img['srcset'].split(',')[-4]
        dict = {
            'name': name,
            'character': character,
            'image':image
        }  
        actors_data.append(dict)    
    
    return jsonify({
        'description': description,
        'big_awards': big_awards,
        'amazon_award': amazon_award,
        'music_data': music_data,
        'rating': rating,
        'rating_people': rating_people,
        'poster': poster,
        'director': director,
        'actors_data': actors_data,
        'title_data': title_data,
        'final_writers': final_writers,
        'final_stars': final_stars,
        'about': new_df
    })

@app.route('/get-reviews')
def get_reviews():
    ttid = request.args.get('id')
    
    headers={'User-Agent':'Mozilla/5.0 (Windows NT 6.3; Win 64 ; x64) Apple WeKit /537.36(KHTML , like Gecko) Chrome/80.0.3987.162 Safari/537.36'} 
    reviews = requests.get(f'https://www.imdb.com/title/{ttid}/reviews?ref_=tt_urv',headers=headers).text
    
    reviews = BeautifulSoup(reviews, 'lxml')
    reviews_data = reviews.find_all('div',class_='lister-item')
    
    final_review_data = []
    for review in reviews_data:
        title = review.find_all('a', class_='title')[0].text.strip()
        date = review.find_all('span', class_='review-date')[0].text.strip()
        a_data = review.find_all('div', class_='show-more__control')[0].text
        rating = review.find('span', class_='rating-other-user-rating')
        if(rating is not None):
            rating_html = rating.find('span')
            if (rating_html is not None):
                rating = rating_html.text
        name = review.find_all('span', class_='display-name-link')[0].text
        dictionary = {
            'title': title,
            'date': date,
            'review': a_data,
            'rating': rating,
            'name':name
        }
        final_review_data.append(dictionary)
    
    return jsonify(final_review_data)
