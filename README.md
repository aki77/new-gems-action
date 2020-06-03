# New Gems

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
      - uses: actions/checkout@v2
      - uses: actions/cache@v2
        with:
          path: vendor/bundle
          key: ${{ runner.os }}-gems-${{ hashFiles('**/Gemfile.lock') }}
          restore-keys: |
            ${{ runner.os }}-gems-
      - name: Set up Ruby
        uses: ruby/setup-ruby@v1
      - uses: aki77/new-gems-action@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

![Demo](https://i.gyazo.com/e426ce8e7d705e9531364bce4e6e13db.png)]
