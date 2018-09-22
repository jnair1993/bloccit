const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Post = require('../../src/db/models').Post;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {
      Topic.create({title: "Expeditions to Alpha Centauri", description: "A compilation of reports from recent visits to the star system"}).then((topic) => {
        this.topic = topic;
        Post.create({title: "My first visit to Proxima Centauri b", body: "I saw some rocks.", topicId: this.topic.id}).then((post) => {
          this.post = post;
          done();
        });
      }).catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#create()", () => {

    it("should create a post object with title and description", (done) => {
      Topic.create({
        title: "My Journey",
        description: "Moving from India was a new experience"
      })
      .then((topic) => {
        expect(topic.title).toBe("My Journey");
        expect(topic.description).toBe("Moving from India was a new experience");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#getPosts()", () => {
    it("should return an array of post objects that are associated with the topic the method was called on", (done) => {
      this.topic.getPosts()
      .then((associatedPosts) => {
        expect(associatedPosts[0].topicId).toBe(this.topic.id);
        expect(associatedPosts[0].title).toBe("My first visit to Proxima Centauri b");
        expect(associatedPosts[0].body).toBe("I saw some rocks.");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });
});