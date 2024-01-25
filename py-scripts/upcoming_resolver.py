import requests

# CTFtime upcomings limit 10
ctftime_url = "https://ctftime.org/api/v1/events/?limit=5"

# Save api response to file
headers = {
    'User-Agent': 'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion'
}
req = requests.get(ctftime_url, headers=headers)

with open("upcomings.txt", 'w') as wf:
    wf.write(req.text)