//
export type NewsAPIType = {
    status:       string;
    totalResults: number;
    articles:     NewsAPIArticle[];
}

export type NewsAPIArticle = {
    source:      NewsAPISource;
    author:      null | string;
    title:       string;
    description: string;
    url:         string;
    urlToImage:  null | string;
    publishedAt: Date;
    content:     string;
}

export type NewsAPISource = {
    id:   null | string;
    name: string;
}


// For Guardian news
export type GuardianType = {
    response: GuardianResponse;
}

export type GuardianResponse = {
    status:      string;
    userTier:    string;
    total:       number;
    startIndex:  number;
    pageSize:    number;
    currentPage: number;
    pages:       number;
    orderBy:     string;
    results:     Result[];
}

export type Result = {
    id:                 string;
    type:               ResultType;
    sectionId:          string;
    sectionName:        string;
    webPublicationDate: Date;
    webTitle:           string;
    webUrl:             string;
    apiUrl:             string;
    isHosted:           boolean;
    pillarId:           string;
    pillarName:         string;
}

export enum ResultType {
    Article = "article",
    Liveblog = "liveblog",
}


// New York Times ResponseType

export type NYTAPIType = {
    status:    string;
    copyright: string;
    response: NYTResponse;
}

export type NYTResponse = {
    docs: Doc[];
    meta: Meta;
}

export type Doc = {
    abstract:         string;
    web_url:          string;
    snippet:          string;
    lead_paragraph:   string;
    source:           Source;
    multimedia:       Multimedia[];
    headline:         Headline;
    keywords:         Keyword[];
    pub_date:         string;
    document_type:    DocumentType;
    news_desk:        string;
    section_name:     string;
    byline:           Byline;
    type_of_material: TypeOfMaterial;
    _id:              string;
    word_count:       number;
    uri:              string;
    subsection_name?: string;
}

export type Byline = {
    original:     string;
    person:       Person[];
    organization: Source | null;
}

export enum Source {
    TheNewYorkTimes = "The New York Times",
}

export type Person = {
    firstname:    string;
    middlename:   null | string;
    lastname:     string;
    qualifier:    null;
    title:        null;
    role:         Role;
    organization: string;
    rank:         number;
}

export enum Role {
    Reported = "reported",
}

export enum DocumentType {
    Article = "article",
    Multimedia = "multimedia",
}

export type Headline = {
    main:           string;
    kicker:         null;
    content_kicker: null;
    print_headline: null;
    name:           null;
    seo:            null;
    sub:            null;
}

export type Keyword = {
    name:  Name;
    value: string;
    rank:  number;
    major: string;
}

export enum Name {
    Glocations = "glocations",
    Organizations = "organizations",
    Persons = "persons",
    Subject = "subject",
}

export type Multimedia = {
    rank:      number;
    subtype:   string;
    caption:   null;
    credit:    null;
    type:      Type;
    url:       string;
    height:    number;
    width:     number;
    legacy:    Legacy;
    subType:   string;
    crop_name: string;
}

export type Legacy = {
    xlarge?:          string;
    xlargewidth?:     number;
    xlargeheight?:    number;
    thumbnail?:       string;
    thumbnailwidth?:  number;
    thumbnailheight?: number;
    widewidth?:       number;
    wideheight?:      number;
    wide?:            string;
}

export enum Type {
    Image = "image",
}

export enum TypeOfMaterial {
    News = "News",
    Video = "Video",
}

export type Meta = {
    hits:   number;
    offset: number;
    time:   number;
}
