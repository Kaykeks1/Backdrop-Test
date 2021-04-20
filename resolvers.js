import { nanoid } from 'nanoid';
// const shortid = require('shortid');

class shortenURL {
  constructor({ url, shortString }) {
    this.url = url;
    this.shortString = shortString;
  }
}

const urlHolder = {};

const resolvers = {
  getShortenURL: ({ sid }) => {
    console.log('sid: ', JSON.stringify(sid));
    console.log('urlHolder1: ', urlHolder);
    const obj = new shortenURL(urlHolder[sid]);
    console.log('obj: ', obj);
    return obj;
  },
  createShortenURL: ({ input }) => {
      // let id = nanoid();
      // const sid = shortid.generate();
      let sid = nanoid(6);
      console.log('sid: ', sid);
      urlHolder[sid] = {};
      console.log('input.url1 : ', input.url);
      urlHolder[sid].url = input.url;
      console.log('input.url2: ', input.url);
      urlHolder[sid].shortString = sid;
      console.log('urlHolder[sid].shortString: ', urlHolder[sid].shortString);
      console.log('urlHolder[sid]: ', urlHolder[sid]);
      console.log('urlHolder2: ', urlHolder);
      return new shortenURL(urlHolder[sid]);
  }
}

export default resolvers;
