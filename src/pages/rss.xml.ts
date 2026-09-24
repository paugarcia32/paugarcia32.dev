import rss from "@astrojs/rss";
import { HOME } from "@consts";
import { normalizeEntryId } from "@lib/utils";
import { getVisibleBlog, getVisibleProjects } from "@lib/content";

type Context = {
  site: string;
};

export async function GET(context: Context) {
  const blog = await getVisibleBlog();
  const projects = await getVisibleProjects();

  const items = [...blog, ...projects].sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
  );

  return rss({
    title: HOME.TITLE,
    description: HOME.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.date,
      link: `/${item.collection}/${normalizeEntryId(item)}/`,
    })),
  });
}
