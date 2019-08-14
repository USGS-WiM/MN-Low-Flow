workflow "Deploy to S3" {
  on = "push"
  resolves = ["GitHub Action for Slack"]
}
 
action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@c6471707d308175c57dfe91963406ef205837dbd"
  args = "branch staging"
}

action "GitHub Action for npm" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Filters for GitHub Actions"]
  args = "run-script build"
}
 
action "GitHub Action for AWS" {
  uses = "actions/aws/cli@aba0951d3bb681880614bbf0daa29b4a0c9d77b8"
  needs = ["GitHub Action for npm"]
  secrets = [
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY"
  ]
  args = "s3 cp $GITHUB_WORKSPACE/desiredfolder/ s3://s3_bucket  --recursive"
}

action "GitHub Action for Slack" {
  uses = "Ilshidur/action-slack@5faabb4216b20af98fe77b6d9048d24becfefd31"
  needs = ["GitHub Action for AWS"]
  secrets = ["SLACK_WEBHOOK"]
  args = "Successfully deployed to S3"
}
