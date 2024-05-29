import twemoji, { TwemojiOptions } from "@twemoji/api";

const twemojiDefaults: Partial<TwemojiOptions> = {
  base: "/",
  folder: "emoji-svgs",
  ext: ".svg",
};

export const replaceEmoji = (html: string | undefined): string => {
  return twemoji.parse(html || "", twemojiDefaults);
};
