# New Gems

Add a message in Pull Request with basic information when new gems are added.

![Demo](https://i.gyazo.com/7b87cc40ca21eb528b067fddb57ecc03.png)

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
      - uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true
      - uses: aki77/new-gems-action@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```
