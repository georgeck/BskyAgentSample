import {Jetstream, CommitType} from "@skyware/jetstream";

// Create a new JetStream instance with ALL posts collection
const jetstream = new Jetstream({
    wantedCollections: ["app.bsky.feed.post"]
});
jetstream.start();

jetstream.onCreate("app.bsky.feed.post", (event) => {
    console.log("New post:", JSON.stringify(event, null, 2))
});

jetstream.on("commit", (event) => {
    if (event.commit.operation === CommitType.Create) {
        console.log("create in ", event.commit.collection, event.commit.record);
    } else if (event.commit.operation === CommitType.Update) {
        console.log("update in", event.commit.collection, event.commit.rkey);
    } else if (event.commit.operation === CommitType.Delete) {
        console.log("delete in", event.commit.collection, event.commit.rkey);
    }
});

// Listen for account status updates
jetstream.on("account", (event) => {
    console.log("account update", event.account.status)
});

// Listen for identity updates
jetstream.on("identity", (event) => {
    console.log("identity update", event.identity.did)
});