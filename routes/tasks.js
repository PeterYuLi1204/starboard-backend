import "dotenv/config";
import express from "express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const docClient = DynamoDBDocumentClient.from(client);

const router = express.Router();

/**
 * middleware to authenticate API keys
 */
router.use((req, res, next) => {
    const apiKey = req.headers.authorization;

    if (!apiKey) {
        return res.status(401).json({ error: "API key is missing." });
    }

    if (apiKey !== process.env.VALID_API_KEY) {
        return res.status(403).json({ error: "Unauthorized API key." });
    }

    next();
});

/**
 * GET endpoint for a user's tasks identified by userId
 */
router.get('/:userId', async (req, res) => {
    try {
        const command = new QueryCommand({
            TableName: "starboard-tasks",
            KeyConditionExpression: "UserId = :userId",
            ExpressionAttributeValues: {
                ":userId": req.params.userId,
            },
        });
    
        const response = await docClient.send(command);
        res.status(200).send(response.Items);
    } catch (error) {
        res.status(500).send("Something went wrong while retrieving tasks. Please try again.");
        console.log(error);
    }
    
});

/**
 * POST endpoint for a user's tasks identified by userId
 */
router.post('/:userId', async (req, res) => {
    try {
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
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send("Something went wrong while creating the task. Please try again.");
        console.log(error);
    }
    
});

/**
 * DELETE endpoint for a singular task identified by userId and taskId
 */
router.delete('/:userId/:taskId', async (req, res) => {
    try {
        const command = new DeleteCommand({
            TableName: "starboard-tasks",
            Key: {
                UserId: req.params.userId,
                TaskId: parseInt(req.params.taskId),
            },
        });
    
        const response = await docClient.send(command);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send("Something went wrong while deleting the task. Please try again.")
        console.log(error);
    }
});

export default router;