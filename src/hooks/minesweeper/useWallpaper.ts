import Axios from "axios";
import { IMG_URLS } from "constants/minesweeper";
import { useState, useEffect } from "react";

export const useWallpaper = () => {
  const [wallpaperUrl, setWallpaperUrl] = useState("");

  useEffect(() => {
    const getWallpaper = async (): Promise<boolean> => {
      let url = "";
      for (let i = 0; i < IMG_URLS.length; i++) {
        const randIdx = Math.floor(Math.random() * IMG_URLS.length);
        url = IMG_URLS[randIdx];
        const res = await Axios.get(url);
        if (res.status === 200) {
          break;
        }
        console.error(`wallpaper from ${url} is unavailable`);
      }
      if (url) {
        setWallpaperUrl(url);
        return false;
      }
      return true;
    };
    getWallpaper().then((err) => {
      if (err) {
        console.error("cannot load wallpaper image url");
      }
    });
  }, []);

  return { wallpaperUrl };
};
