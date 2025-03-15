import axios from "axios";

const fetchCountries = async (name: string) => {
  try {
    const res = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const fetchPexelImages = async (
  nextPageUrl: string
): Promise<PexelResponse> => {
  try {
    const res = await axios.get(nextPageUrl, {
      headers: {
        Authorization: import.meta.env.VITE_PEXELS_API_KEY,
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
    return {
      page: 0,
      photos: [],
      per_page: 0,
      next_page: null,
      total_results: 0,
    };
  }
};

const fetchPixabayImages = async (url: string): Promise<PixabayResponse> => {
  try {
    const res = await axios.get(
      `https://pixabay.com/api/${url}&key=${
        import.meta.env.VITE_PIXABAY_API_KEY
      }`
    );
    return res.data;
  } catch (e) {
    console.log(e);
    return { totalHits: 0, hits: [], total: 0 };
  }
};

const fetchUnsplashImages = async (
  url: string,
  isSearch?: boolean
): Promise<UnsplashResponse> => {
  try {
    const res = await axios.get(`https://api.unsplash.com/${url}`, {
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
      },
    });
    if (isSearch) {
      return res.data;
    }
    return { total: 10000, total_pages: 200, results: res.data };
  } catch (e) {
    console.error("Error fetching Unsplash images:", e);
    return { total: 0, results: [], total_pages: 0 };
  }
};
export { fetchPexelImages, fetchPixabayImages, fetchUnsplashImages,fetchCountries };
