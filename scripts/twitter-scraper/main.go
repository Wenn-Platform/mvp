package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"strconv"

	twitterscraper "github.com/n0madic/twitter-scraper"
)

func main() {
	if len(os.Args) < 2 {
		os.Stderr.WriteString("Error: No username provided.\n")
		return
	}
	username := os.Args[1]
	var maxTweets int
	var err error
	if len(os.Args) < 3 {
		maxTweets = 10
	} else {
		maxTweets, err = strconv.Atoi(os.Args[2])
		if err != nil {
			maxTweets = 10
		}
	}

	scraper := twitterscraper.New()
	tweetResults := scraper.GetTweets(context.Background(), username, maxTweets)
	tweets := make([]*twitterscraper.TweetResult, maxTweets)
	i := 0

	for tweet := range tweetResults {
		if tweet.Error != nil {
			panic(tweet.Error)
		}
		tweets[i] = tweet
		i += 1
	}
	tweetsJson, err := json.Marshal(tweets)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(tweetsJson))
}
