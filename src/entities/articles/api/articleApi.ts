import axios from 'axios';
import { API_KEY } from 'env-config';

interface IParams {
  country?: string;
  category?: string;
  sources?: string;
  q?: string;
  pageSize?: number;
  page?: number;
}

class ArticleApi {
  private readonly instance;
  public constructor() {
    this.instance = axios.create({
      baseURL: 'https://newsapi.org/v2',
      headers: {
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    });
  }

  public async getArticles(params: IParams = {}) {
    try {
      const defaultParams = {
        country: 'ru',
        pageSize: 10,
        page: 1,
      };

      const finalParams = { ...defaultParams, ...params };

      const res = await this.instance.get('top-headlines', {
        params: finalParams,
      });

      console.log('Request URL:', res.config.url);
      console.log('Response status:', res.status);
      console.log('Articles count:', res.data.articles.length);
      console.log('Total results:', res.data.totalResults);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error(
          'API Error:',
          err.response?.status,
          err.response?.data?.message || err.message,
        );
      } else {
        console.error('Unexpected error:', err);
      }

      throw err;
    }
  }
}

export const articleApi = new ArticleApi();
