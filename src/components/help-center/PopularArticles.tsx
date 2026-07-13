import {
    ArrowRight,
    BookOpen,
    Clock
} from "lucide-react";

const articles = [
    {
        title: "How to create your first chatbot",
        category: "Getting Started",
        readTime: "5 min read",
    },
    {
        title: "Understanding chatbot training data",
        category: "AI Training",
        readTime: "8 min read",
    },
    {
        title: "How to integrate chatbot into your website",
        category: "Integration",
        readTime: "6 min read",
    },
    {
        title: "Managing conversations and analytics",
        category: "Dashboard",
        readTime: "7 min read",
    },
];

export default function PopularArticles() {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Popular Articles
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Most viewed help resources
                    </p>
                </div>

                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View all
                    <ArrowRight size={16} />
                </button>
            </div>


            {/* Article List */}
            <div className="space-y-4">

                {articles.map((article, index) => (
                    <div
                        key={index}
                        className="
            group
            flex
            items-center
            justify-between
            p-4
            rounded-xl
            border
            border-gray-100
            hover:border-blue-200
            hover:bg-blue-50/40
            transition
            cursor-pointer
            "
                    >

                        <div className="flex gap-4 items-center">

                            <div className="
                w-10
                h-10
                rounded-lg
                bg-blue-100
                flex
                items-center
                justify-center
                text-blue-600
              ">
                                <BookOpen size={20} />
                            </div>


                            <div>
                                <h3 className="
                text-sm
                font-semibold
                text-gray-900
                group-hover:text-blue-600
                ">
                                    {article.title}
                                </h3>

                                <div className="
                flex
                items-center
                gap-3
                mt-1
                text-xs
                text-gray-500
                ">

                                    <span>
                                        {article.category}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {article.readTime}
                                    </span>

                                </div>

                            </div>

                        </div>


                        <ArrowRight
                            size={18}
                            className="
              text-gray-400
              group-hover:text-blue-600
              transition
              "
                        />

                    </div>
                ))}

            </div>

        </div>
    );
}