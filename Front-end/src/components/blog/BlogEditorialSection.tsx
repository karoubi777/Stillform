export type EditorialParagraph = {
  heading: string;
  body: string;
};

export interface BlogEditorialData {
  title: string;
  sections: EditorialParagraph[];
  mainImage: string;
  sideImages: [string, string, string];
}

export const DEFAULT_EDITORIAL_DATA: BlogEditorialData = {
  title:
    '"UNVEILING TIMELESS ELEGANCE: EXPLORING THE ALLURE OF VINTAGE FASHION"',
  sections: [
    {
      heading: "The Essence of Time Travel",
      body: "Vintage fashion allows us to transcend eras, stepping into the shoes of those who came before us. Each piece tells a story, offering a glimpse into the cultural and societal norms of its time. From the flapper dresses of the 1920s that embodied the spirit of rebellion to the tailored suits of the 1960s that epitomized sophistication, every era has its signature style waiting to be revived.",
    },
    {
      heading: "Quality Beyond Compare",
      body: "One of the hallmarks of vintage fashion is the unparalleled craftsmanship that went into creating garments that stood the test of time. In a world where fast fashion often prioritizes quantity over quality, vintage pieces remind us of an era when attention to detail and durability were paramount. The feel of a vintage silk dress or the weight of a hand-sewn coat is a testament to the dedication of artisans of yesteryears.",
    },
    {
      heading: "Eclectic Personal Style",
      body: "Embracing vintage fashion allows us to curate a wardrobe that's uniquely ours. Mixing and matching vintage pieces with contemporary items creates a personal style that defies categorization. From pairing a 1970s bohemian blouse with modern jeans to accessorizing a little black dress with vintage brooches, the possibilities are endless and the results are often strikingly original.",
    },
    {
      heading: "Sustainable Chic",
      body: "As the world embraces sustainability, vintage fashion takes center stage as a prime example of eco-conscious style. Choosing pre-loved clothing not only reduces the demand for new production but also breathes new life into garments that might otherwise be forgotten. It's a nod to slow fashion, a movement that encourages thoughtful consumption and reduces the impact on the environment.",
    },
  ],
  mainImage: "/images/blog/editorial/editorial-main.png",
  sideImages: [
    "/images/blog/editorial/editorial-side-1.png",
    "/images/blog/editorial/editorial-side-2.png",
    "/images/blog/editorial/editorial-side-3.png",
  ],
};

interface BlogEditorialSectionProps {
  data?: BlogEditorialData;
}

export default function BlogEditorialSection({
  data = DEFAULT_EDITORIAL_DATA,
}: BlogEditorialSectionProps) {
  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 pt-10 sm:pt-14 pb-12 sm:pb-16 text-left">
      {/* Headline with Left Blue Accent Bar */}
      <h2 className="border-l-[3px] border-[#3B72D9] pl-3 sm:pl-4 text-sm sm:text-base lg:text-lg font-bold uppercase text-gray-900 tracking-wide leading-snug mb-5 sm:mb-6">
        {data.title}
      </h2>

      {/* Editorial Body Sections */}
      <div className="pl-3.5 sm:pl-5 flex flex-col gap-4 text-xs text-gray-600 leading-relaxed max-w-[1060px]">
        {data.sections.map((sec) => (
          <div key={sec.heading}>
            <h3 className="font-semibold text-gray-800 mb-1">{sec.heading}</h3>
            <p>{sec.body}</p>
          </div>
        ))}
      </div>

      {/* Asymmetric Photo Collage (1 Large Left + 3 Stacked Right) */}
      <div className="mt-8 sm:mt-10 grid grid-cols-[2fr_1fr] gap-2.5 sm:gap-4 h-[280px] sm:h-[430px] lg:h-[520px] overflow-hidden">
        <div className="w-full h-full min-h-0 overflow-hidden rounded-xs bg-[#F5F6F6]">
          <img
            src={data.mainImage}
            alt="Vintage fashion editorial look"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="h-full min-h-0 grid grid-rows-3 gap-2.5 sm:gap-4">
          {data.sideImages.map((img, idx) => (
            <div
              key={`${img}-${idx}`}
              className="w-full h-full min-h-0 overflow-hidden rounded-xs bg-[#F5F6F6]"
            >
              <img
                src={img}
                alt={`Editorial detail ${idx + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}