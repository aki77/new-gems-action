

Add a message in Pull Request with basic information when new gems are added.

## Usage:

The action works only with pull_request event.

### Inputs
- token - The GITHUB_TOKEN secret.

## Example

```yaml
name: New gems

on:
  pull_request:
    paths:
      - Gemfile

jobs:
  new-gems:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: 2.7
      - uses: aki77/new-gems-action@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

![Demo](https://i.gyazo.com/105ca743b1781c7fc292663050a130dc.png)
