# README

Simple golang scraper that scrapes the first N tweets for a given user and outputs them as JSON.

To run in dev:

```
go run main.go <twitter username> [number of tweets=10]
```

To build for deployed env:

```
go build .
```

And run the compiled binary:

```
./twitter-scraper <twitter username> [number of tweets=10]
```