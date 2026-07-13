import {
    Headphones,
    Mail,
    MessageCircle,
    ArrowRight,
    Clock,
    ShieldCheck
} from "lucide-react";


export default function SupportCard() {

    return (
        <div
            className="
            bg-white
            rounded-2xl
            p-5
            border
            border-gray-100
            shadow-sm
            relative
            overflow-hidden
            "
        >

            {/* Background Glow */}
            <div
                className="
                absolute
                -top-10
                -right-10
                w-32
                h-32
                bg-purple-100
                rounded-full
                blur-3xl
                "
            />

            {/* Header */}
            <div className="flex items-start justify-between relative mt-2">


                <div className="flex gap-3">

                    <div
                        className="
                        w-11
                        h-11
                        rounded-xl
                        bg-purple-50
                        flex
                        items-center
                        justify-center
                        "
                    >
                        <Headphones
                            size={22}
                            className="text-purple-600"
                        />
                    </div>


                    <div>

                        <h2 className="
                        text-md
                        font-semibold
                        text-gray-900
                        ">
                            Still need help?
                        </h2>


                        <p className="
                        text-[12px]
                        text-gray-500
                        mt-1
                        leading-relaxed
                        ">
                            Our support team is ready to
                            <br />
                            help you anytime.
                        </p>

                    </div>

                </div>


                {/* Online Badge */}

                <span
                    className="
                    text-[12px]
                    px-2
                    py-1
                    rounded-full
                    bg-green-50
                    text-green-600
                    font-medium
                    "
                >
                    Online
                </span>


            </div>



            {/* Bot Illustration Placeholder */}

            <div
                className="
    mt-5
    h-28
    rounded-xl
    bg-purple-50
    flex
    flex-col
    items-center
    justify-center
    relative
    "
            >

                <div
                    className="
        w-14
        h-14
        rounded-2xl
        bg-white
        shadow-sm
        flex
        items-center
        justify-center
        "
                >

                    <MessageCircle
                        size={28}
                        className="text-purple-600"
                    />

                </div>


                <p
                    className="
        mt-3
        text-xs
        font-medium
        text-gray-600
        "
                >
                    AI Support Assistant
                </p>


            </div>



            {/* Main Button */}

            <button
                className="
                mt-7
                w-full
                bg-gradient-to-r
                from-purple-600
                to-indigo-600
                text-white
                py-3.5
                rounded-lg
                text-sm
                font-medium
                flex
                items-center
                justify-center
                gap-2
                hover:opacity-90
                transition
                "
            >

                Contact Support

                <ArrowRight size={14} />

            </button>




            {/* Support Cards */}

            <div
                className="
                grid
                grid-cols-2
                gap-3
                mt-5
                "
            >


                <div
                    className="
                    border
                    border-gray-100
                    rounded-xl
                    p-3
                    "
                >

                    <div className="flex gap-2">

                        <Mail
                            size={16}
                            className="text-purple-600"
                        />


                        <h3 className="
                        text-xs
                        font-semibold
                        ">
                            Email
                        </h3>

                    </div>


                    <p className="
                    text-[12px]
                    text-gray-500
                    mt-2
                    ">
                        Reply within
                        <br />
                        24 hours
                    </p>

                </div>



                <div
                    className="
                    border
                    border-gray-100
                    rounded-xl
                    p-3
                    "
                >

                    <div className="flex gap-2">

                        <Clock
                            size={18}
                            className="text-purple-600"
                        />

                        <h3 className="
                        text-xs
                        font-semibold
                        ">
                            Response
                        </h3>

                    </div>


                    <p className="
                    text-[12px]
                    text-gray-500
                    mt-2
                    ">
                        Avg.
                        <br />
                        5 minutes
                    </p>

                </div>


            </div>



            {/* Trust Footer */}

            <div
                className="
                mt-4
                flex
                items-center
                gap-2
                text-[11px]
                text-gray-500
                "
            >

                <ShieldCheck
                    size={14}
                    className="text-green-500"
                />

                Trusted support by 10,000+ users

            </div>


        </div>
    );
}