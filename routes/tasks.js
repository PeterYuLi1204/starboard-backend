import "dotenv/config"
import express from "express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const docClient = DynamoDBDocumentClient.from(client);

const router = express.Router();

router.get('/:userId', async (req, res) => {
    const command = new QueryCommand({
        TableName: "starboard-tasks",
        KeyConditionExpression: "UserId = :userId",
        ExpressionAttributeValues: {
            ":userId": req.params.userId,
        },
    });

    const response = await docClient.send(command);
    res.status(200).send(response.Items);
});

router.post('/:userId', async (req, res) => {
    const command = new PutCommand({
        TableName: "starboard-tasks",
        Item: {
          UserId: req.params.userId,
          TaskId: req.body.taskId,
          Title: req.body.title,
          DueDate: req.body.dueDate,
        },
    });

    const response = await docClient.send(command);
    res.status(200).send(response.Items);
});

export default router;