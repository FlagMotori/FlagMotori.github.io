import requests
import json

def get_github_user_profile(username):
    base_url = f"https://api.github.com/users/{username}"
    
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

with open('assets/users', 'r') as rf:
    usernames = rf.read()
usernames = usernames.splitlines()

abouts = {}
for username in usernames:
    user_data = get_github_user_profile(username)
    abouts[username] = {}
    profile_image_data = requests.get(user_data['profile_image_url']).content
    with open(f'assets/profile/{username}.jpg', 'wb') as cf:
        cf.write(profile_image_data)

    del user_data['profile_image_url']
    for key in user_data:
        value = user_data[key]
        abouts[username][key] = value

with open('assets/profile/abouts.json', 'w') as cf:
    cf.write(json.dumps(abouts))