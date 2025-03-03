//@ts-nocheck
import { structureNewsData } from ".";
import { NewsAPIType, GuardianType, NYTAPIType, ResultType } from "../types";

describe("structureNewsData function", () => {
  const defaultImage = "/images/default-news.jpg";

  it("should process data from NewsAPI correctly", () => {
    const newsData: NewsAPIType = {
      status: "ok",
      totalResults: 1,
      articles: [
        {
          title: "News Title",
          description: "News description",
          source: { name: "News Source", id: "source-id" },
          publishedAt: new Date("2021-12-01T12:00:00Z"),
          url: "https://example.com",
          author: "Author Name",
          content: "News content",
          urlToImage: "https://example.com/image.jpg",
        },
      ],
    };

    const result = structureNewsData(newsData);

    expect(result.length).toBe(1);
    expect(result[0].title).toBe("News Title");
    expect(result[0].description).toBe("News description");
    expect(result[0].source).toBe("News Source");
    expect(result[0].publishedAt).toEqual(new Date("2021-12-01T12:00:00Z"));
    expect(result[0].url).toBe("https://example.com");
    expect(result[0].author).toBe("Author Name");
    expect(result[0].imgLink).toBe("https://example.com/image.jpg");
  });

  it("should process data from NYT API correctly", () => {
    const nytData: NYTAPIType = {
      response: {
        docs: [
          {
            headline: { main: "NYT News Title" },
            abstract: "NYT News description",
            byline: { original: "NYT Author" },
            pub_date: "2021-12-01T12:00:00Z",
            web_url: "https://www.nytimes.com/image.jpg",
            section_name: "Politics",
            multimedia: [{ url: "/image.jpg" }],
          },
        ],
      },
      copyright: "NYT",
    };

    const result = structureNewsData(nytData);
    expect(result.length).toBe(1);
    expect(result[0].title).toBe("NYT News Title");
    expect(result[0].description).toBe("NYT News description");
    expect(result[0].source).toBe("New York Times");
    expect(result[0].publishedAt).toEqual(new Date("2021-12-01T12:00:00Z"));
    expect(result[0].url).toBe("https://www.nytimes.com/image.jpg");
    expect(result[0].author).toBe("NYT Author");
    expect(result[0].imgLink).toBe("https://www.nytimes.com//image.jpg");
  });

  it("should process data from The Guardian API correctly", () => {
    const guardianData: GuardianType = {
      //@ts-ignore
      response: {
        results: [
          {
            id: "guardian-id",
            type: ResultType.Article,
            sectionId: "technology",
            apiUrl:
              "https://content.guardianapis.com/technology/2021/dec/01/guardian-news-title",
            webTitle: "Guardian News Title",
            webPublicationDate: new Date("2021-12-01T12:00:00Z"),
            webUrl: "https://guardian.com",
            sectionName: "Technology",
            isHosted: false,
            pillarId: "pillar-id",
            pillarName: "Pillar Name",
          },
        ],
      },
    };

    const result = structureNewsData(guardianData);

    expect(result.length).toBe(1);
    expect(result[0].title).toBe("Guardian News Title");
    expect(result[0].description).toBe("No description available");
    expect(result[0].source).toBe("The Guardian");
    expect(result[0].publishedAt).toEqual(new Date("2021-12-01T12:00:00Z"));
    expect(result[0].url).toBe("https://guardian.com");
    expect(result[0].author).toBe("Unknown");
    expect(result[0].imgLink).toBe(defaultImage);
  });
});
