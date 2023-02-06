import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_secretsmanager as secretsmanager } from "aws-cdk-lib";
import * as dotenv from "dotenv";

dotenv.config();
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsInfStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    if (!process.env.GITHUB_TOKEN) throw "No Github token provided";
    const secretString = cdk.SecretValue.unsafePlainText(
      process.env.GITHUB_TOKEN
    );
    const templatedSecret = new secretsmanager.Secret(this, "github-token", {
      secretName: "github-token",
      secretStringValue: secretString,
      description: "GitHub access key for telegram bot code pipeline",
    });
  }
}
