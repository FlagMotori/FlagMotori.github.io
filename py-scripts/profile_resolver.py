import requests
import json

def get_github_user_profile(userid):
    base_url = f"https://api.github.com/user/{userid}"
    
    response = requests.get(base_url)
    data = {}
    if response.status_code == 200:
        user_data = response.json()
        data['profile_image_url'] = user_data.get("avatar_url")
        data['profile_bio'] = user_data.get("bio")
        data['profile_twitter'] = user_data.get('twitter_username')
        return data
    else:
        return None

with open('assets/users.json', 'r') as rf:
    users = json.load(rf)

abouts = {}
for user in users:
    user_data = get_github_user_profile(users[user])
    abouts[user] = {}
    profile_image_data = requests.get(user_data['profile_image_url']).content
    with open(f'{user}.jpg', 'wb') as cf:
        cf.write(profile_image_data)

    del user_data['profile_image_url']
    for key in user_data:
        value = user_data[key]
        abouts[user][key] = value

with open('assets/profile/abouts.json', 'w', encoding='utf-8') as cf:
    json_data = json.dumps(abouts, ensure_ascii=False)
    cleaned_data = json_data.replace('\r\n', ' ').replace('\r', '').replace('\n', '')
    cf.write(cleaned_data)
