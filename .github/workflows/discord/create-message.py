#!/usr/bin/python3
import argparse
import json

discord_github_mapping = {
    "Miou-zora": "256449495846486038",
    "FoxaxeWasTaken":"166667387582676993",
    "Kiya971":"689602133120909432",
    "Pablodeibar":"266225614174814208",
    "Benjicatch":"665549531924004866",
    "AlexGuillard":"283630773377171459",
}

def arg_parser():
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument("actor", help="actor name")
    parser.add_argument("-r", "--review", action="store_true", help="review")
    parser.add_argument("pull_request_link", help="pull request link")
    parser.add_argument("pull_request_name", help="pull request name")
    parser.add_argument("reviewer", nargs="*", help="reviewer name")
    args = parser.parse_args()
    return args

def main():
    args = arg_parser()
    actor = args.actor
    pull_request_name = args.pull_request_name
    pull_request_link = args.pull_request_link
    try:
        reviewers = args.reviewer[0].split(", ")
    except IndexError:
        reviewers = []

    if not args.review:
        message_dict = {
            "embeds": [
                {
                    "description": f"""### Pull Request: [{pull_request_name}]({pull_request_link})
                    **{f'<@{discord_github_mapping[actor]}>' if actor in discord_github_mapping else 'Not Found'}** triggered Pull Request\nAnd requested review from {', '.join([f'<@{discord_github_mapping[reviewer]}>' if reviewer in discord_github_mapping else reviewer for reviewer in reviewers]) if reviewers else 'no one'}.""",
                    "color": 16711680
                }
            ]
        }
    else:
        message_dict = {
            "embeds": [
                {
                    "description": f"""### Review Wanted: [{pull_request_name}]({pull_request_link})
                    **{f'<@{discord_github_mapping[actor]}>' if actor in discord_github_mapping else 'Not Found'}** requested review from {', '.join([f'<@{discord_github_mapping[reviewer]}>' if reviewer in discord_github_mapping else reviewer for reviewer in reviewers]) if reviewers else 'no one'}.""",
                    "color": 177013
                }
            ]
        }
    print(json.dumps(message_dict))

if "__main__" == __name__:
    main()
