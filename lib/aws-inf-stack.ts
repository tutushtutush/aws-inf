import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';'
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { AttributeType } from "aws-cdk-lib/aws-dynamodb";

export class AwsInfStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const singleTable = new dynamodb.Table(this, "SingleTable", {
      partitionKey: {
        name: "pk",
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "sk",
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Define global secondary index for tags attribute
    singleTable.addGlobalSecondaryIndex({
      indexName: "GSI1",
      partitionKey: { name: "tags", type: AttributeType.STRING },
      sortKey: { name: "sk", type: AttributeType.STRING },
    });

    // Define the singleTable's auto scaling
    singleTable.autoScaleWriteCapacity({
      minCapacity: 1,
      maxCapacity: 50,
    });
  }
}
