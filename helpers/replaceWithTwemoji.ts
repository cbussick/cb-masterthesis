import twemoji from "@twemoji/api";

const twemojiDefaults: Partial<twemoji.TwemojiOptions> = {
  base: "/",
  folder: "emoji-svgs",
  ext: ".svg",
};

export const replaceEmoji = (html: string | undefined): string => {
  // @ts-ignore
  return twemoji.parse(html || "", twemojiDefaults);
};
