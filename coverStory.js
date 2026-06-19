const coverStoryPDFs = [
    { id: "pdf-1", path: "./Colored-Cover-Stories/01.pdf", driveUrl: "https://drive.google.com/file/d/1o1m-AOBmkYQnOCbGpgNqfuhypJw0LyFb/preview" },
    { id: "pdf-2", path: "./Colored-Cover-Stories/02.pdf", driveUrl: "https://drive.google.com/file/d/1ZMN2h90f8dtrsGeeJaFlMQ2ilexzjGNZ/preview" },
    { id: "pdf-3", path: "./Colored-Cover-Stories/03.pdf", driveUrl: "https://drive.google.com/file/d/1DGH137BYqBw8nk0Z7sSyo8o43ONz81Wf/preview" },
    { id: "pdf-4", path: "./Colored-Cover-Stories/04.pdf", driveUrl: "https://drive.google.com/file/d/11NCJhE-fjhxVzkF76g8vK9cK9jElHMLU/preview" },
    { id: "pdf-5", path: "./Colored-Cover-Stories/05.pdf", driveUrl: "https://drive.google.com/file/d/1jwst7A5x5-XdCp2uRMSV1Bzkcz3nyyZ5/preview" },
    { id: "pdf-6", path: "./Colored-Cover-Stories/06.pdf", driveUrl: "https://drive.google.com/file/d/1RG7C-0-w66xkNGV-BBma9wKuDrTzuiKS/preview" },
    { id: "pdf-7", path: "./Colored-Cover-Stories/07.pdf", driveUrl: "https://drive.google.com/file/d/1srYxhyx1WsHqzaXHAFr041A4qgVaqKxn/preview" },
    { id: "pdf-8", path: "./Colored-Cover-Stories/08.pdf", driveUrl: "https://drive.google.com/file/d/1E_rMKM3q0fsiRZSzUuJVHyC1WSlKXEdr/preview" },
    { id: "pdf-9", path: "./Colored-Cover-Stories/08_09.pdf", driveUrl: "https://drive.google.com/file/d/19viS9LFusX5zEy9aQWb2VPpnx7WwO5f5/preview" },
    { id: "pdf-10", path: "./Colored-Cover-Stories/09.pdf", driveUrl: "https://drive.google.com/file/d/14SoE08itCyfZoR01u17wuy5ropLGx4r4/preview" },
    { id: "pdf-11", path: "./Colored-Cover-Stories/09_10.pdf", driveUrl: "https://drive.google.com/file/d/1VicvvI0x5VAL8YXFdw8Hw2lQxrdKKQ9m/preview" },
    { id: "pdf-12", path: "./Colored-Cover-Stories/10.pdf", driveUrl: "https://drive.google.com/file/d/1Rji2KO-IFmOMCGX0WXpyeOt3awqvIsGR/preview" },
    { id: "pdf-13", path: "./Colored-Cover-Stories/11-18.pdf", driveUrl: "https://drive.google.com/file/d/18CFV8ayme9D-Y0Dzv39N1T2635MDXdE-/preview" },
    { id: "pdf-14", path: "./Colored-Cover-Stories/19.pdf", driveUrl: "https://drive.google.com/file/d/1MnJwXPs_R6H_UXeOQtGWXPSOWeZcsOCk/preview" },
    { id: "pdf-15", path: "./Colored-Cover-Stories/20_(with_Color_Spreads).pdf", driveUrl: "https://drive.google.com/file/d/1yTHdvkemkvoOL5fVcUxLdjmyVq5qTlKq/preview" },
    { id: "pdf-16", path: "./Colored-Cover-Stories/21_(with_Color_Spreads).pdf", driveUrl: "https://drive.google.com/file/d/1hUrvjyntwwSoI1Q0sMNgqn-s5NbhQaEj/preview" },
    { id: "pdf-17", path: "./Colored-Cover-Stories/22_(with_Color_Spreads).pdf", driveUrl: "https://drive.google.com/file/d/1UR2mF2LrGL8dqZmGevwc4ECGZD2kDIGi/preview" },
    { id: "pdf-18", path: "./Colored-Cover-Stories/23.pdf", driveUrl: "https://drive.google.com/file/d/yo/preview" },
    { id: "pdf-19", path: "./Colored-Cover-Stories/24.pdf", driveUrl: "https://drive.google.com/file/d/yo/preview" },
    { id: "pdf-20", path: "./Colored-Cover-Stories/25.pdf", driveUrl: "https://drive.google.com/file/d/yo/preview" },
    { id: "pdf-21", path: "./Colored-Cover-Stories/26.pdf", driveUrl: "https://drive.google.com/file/d/yo/preview" }
];

const coverStoryGalleries = [
    {
        id: "pdf-0",
        type: "story",
        title: "",
        folder: "",
        altFolder: "./Colored-Cover-Stories/00(2-34)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/00.png",
        pageCount: 0,
        locked: []
    },
    {
        id: "pdf-0.5",
        type: "request",
        folder: "./Colored-Cover-Stories/00(2-34)/"
    },
    {
        id: "pdf-1",
        type: "story",
        title: "Buggy's Crew Adventure Chronicles",
        folder: "./Colored-Cover-Stories/01(35-75)/",
        altFolder: "./Colored-Cover-Stories/01(38-69+76-82)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/01.png",
        pageCount: 28,
        locked: [] // "19_62-side" & "19_63-side"
    },
    {
        id: "pdf-1.5",
        type: "request",
        folder: "./Colored-Cover-Stories/01(38-69+76-82)/"
    },
    {
        id: "pdf-2",
        type: "story",
        title: "Diary of Koby-Meppo",
        folder: "./Colored-Cover-Stories/02(83-119)/",
        altFolder: "./Colored-Cover-Stories/02(120-125)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/02.png",
        pageCount: 30,
        locked: []/*,
        locked: ["03_86-extra", "10_94-extra", "17_103-extra"]*/
    },
    {
        id: "pdf-2.5", // 86 & 94 & 103
        type: "request",
        folder: "./Colored-Cover-Stories/02(120-125)/"
    },
    {
        id: "pdf-3",
        type: "story",
        title: "Jango's Dance Paradise",
        folder: "./Colored-Cover-Stories/03(126-172)/",
        altFolder: "./Colored-Cover-Stories/03(173-181)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/03.png",
        pageCount: 37,
        locked: []/*,
        locked: ["37_172-extra(ep128-ch214)"],
        locked: ["09_137-extra", "14_144-extra", "30_165-extra"]*/
    },
    {
        id: "pdf-3.5", // 137 & 144 & 165
        type: "request",
        folder: "./Colored-Cover-Stories/03(173-181)/"
    },
    {
        id: "pdf-4",
        type: "story",
        title: "Hatchan's Sea-Floor Stroll",
        folder: "./Colored-Cover-Stories/04(182-228)/",
        altFolder: "./Colored-Cover-Stories/04(229-235)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/04.png",
        pageCount: 40,
        locked: []/*,
        locked: ["18-edited(ep531-ch612)", "32_218-extra(ep390-ch496)"]*/
    },
    {
        id: "pdf-4.5",
        type: "request",
        folder: "./Colored-Cover-Stories/04(229-235)/"
    },
    {
        id: "pdf-5",
        type: "story",
        title: "Wapol's Omnivorous Hurrah",
        folder: "./Colored-Cover-Stories/05(236-262)/",
        altFolder: "./Colored-Cover-Stories/05(263-271)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/05.png",
        pageCount: 23,
        locked: []/*,
        locked: ["14_251-extra(ep345-ch451)", "18-edited(ep557-ch636)"],
        locked: ["07-edited", "09-edited", "22-edited"]*/
    },
    {
        id: "pdf-5.5",
        type: "request",
        folder: "./Colored-Cover-Stories/05(263-271)/"
    },
    {
        id: "pdf-6",
        type: "story",
        title: "Ace's Great Blackbeard Search",
        folder: "./Colored-Cover-Stories/06(272-305)/",
        altFolder: "./Colored-Cover-Stories/06(306-313)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/06.png",
        pageCount: 29,
        locked: []
    },
    {
        id: "pdf-6.5",
        type: "request",
        folder: "./Colored-Cover-Stories/06(306-313)/"
    },
    {
        id: "pdf-7",
        type: "story",
        title: "Gedatsu's Accidental Blue-Sea Life",
        folder: "./Colored-Cover-Stories/07(314-348)/",
        altFolder: "./Colored-Cover-Stories/07(349-358)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/07.png",
        pageCount: 32,
        locked: []
    },
    {
        id: "pdf-7.5",
        type: "request",
        folder: "./Colored-Cover-Stories/07(349-358)/"
    },
    {
        id: "pdf-8",
        type: "story",
        title: "Miss Goldenweek's \"Operation: Meet Baroque Works\"",
        folder: "./Colored-Cover-Stories/08(359-413)/",
        altFolder: "./Colored-Cover-Stories/08(414-423)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/08.png",
        pageCount: 42,
        locked: [] // "06_366-side" & "17+TL" (only in Colored)
    },
    {
        id: "pdf-8.5",
        type: "request",
        folder: "./Colored-Cover-Stories/08(414-423)/"
    },
    {
        id: "pdf-9",
        type: "story",
        title: "Where Are They Now? #1 - Skypiea",
        folder: "./Colored-Cover-Stories/08_09(424-427)/",
        altFolder: "",
        thumbnail: "./embeds/thumbnails/Cover Stories/08_09.png",
        pageCount: 3,
        locked: []/*,
        locked: ["01-edited"]*/
    },
    {
        id: "pdf-10",
        type: "story",
        title: "Enel's Great Space Operations",
        folder: "./Colored-Cover-Stories/09(428-474)/",
        altFolder: "./Colored-Cover-Stories/09(475-485)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/09.png",
        pageCount: 38,
        locked: ["38_474-extra(without-TS-Franky)"]/*, // "38_474-extra(ep418-ch523)"
        locked: ["01-edited", "03_432-extra", "17-edited"] // "03_432-extra+TL" (only in Colored)*/
    },
    {
        id: "pdf-10.5", // 432
        type: "request",
        folder: "./Colored-Cover-Stories/09(475-485)/"
    },
    {
        id: "pdf-11",
        type: "story",
        title: "Where Are They Now? #2 - Water 7",
        folder: "./Colored-Cover-Stories/09_10(486-490)/",
        altFolder: "",
        thumbnail: "./embeds/thumbnails/Cover Stories/09_10.png",
        pageCount: 4,
        locked: []/*,
        locked: ["03_488-extra"]*/
    },
    {
        id: "pdf-12",
        type: "story",
        title: "CP9's Independent Report",
        folder: "./Colored-Cover-Stories/10(491-528)/",
        altFolder: "./Colored-Cover-Stories/10(529-542)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/10.png",
        pageCount: 33,
        locked: []/*,
        locked: ["06-edited"]*/
    },
    {
        id: "pdf-12.5",
        type: "request",
        folder: "./Colored-Cover-Stories/10(529-542)/"
    },
    {
        id: "pdf-13",
        type: "story",
        title: "Straw Hat's Separation Serial",
        folder: "./Colored-Cover-Stories/11-18(543-560)/",
        altFolder: "./Colored-Cover-Stories/11-18(561-597+599-611)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/11-18.png",
        pageCount: 16,
        locked: []/*,
        locked: ["00_543-extra"]*/
    },
    {
        id: "pdf-13.5",
        type: "request",
        folder: "./Colored-Cover-Stories/11-18(561-597+599-611)/"
    },
    {
        id: "pdf-14",
        type: "story",
        title: "From the Decks of the World",
        folder: "./Colored-Cover-Stories/19(613-668)/",
        altFolder: "./Colored-Cover-Stories/19(669-673)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/19.png",
        pageCount: 48,
        locked: []/*,
        locked: ["48_(ep663-ch731)"] // ch668 spoiler
        locked: ["07-edited", "22_638-extra1", "22_638-extra2", "28-edited", "39_657-edited", "39_657-extra", "45-edited"]*/
    },
    {
        id: "pdf-14.5",
        type: "request",
        folder: "./Colored-Cover-Stories/19(669-673)/"
    },
    {
        id: "pdf-15",
        type: "story",
        title: "Caribou's Kehihihihi in the New World",
        folder: "./Colored-Cover-Stories/20(674-731)/",
        altFolder: "./Colored-Cover-Stories/20(732-749)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/20.png",
        pageCount: 46,
        locked: [
            "15_691-extra(movie-12-film-z)", /* UNDO if "#12 Film Z" done
            = 691-colorspread_15_(movie-12-film-z) */
            "676-colorspread_02", "685-colorspread_10", "692-colorspread_15", "693-colorspread_15", "699-colorspread_20",
            "703-colorspread_23", "707-colorspread_26", "710-colorspread_28", "717-colorspread_34", "724-colorspread_40",
            "726-colorspread_41" // UNDO once "Cover Pages (Ch. 732-749)  [Fan Requests]" done
        ]/*,
        locked: ["24_704-extra", "27_708-extra"]*/
    },
    {
        id: "pdf-15.5",
        type: "request",
        folder: "./Colored-Cover-Stories/20(732-749)/"
    },
    {
        id: "pdf-16",
        type: "story",
        title: "Solo Journey of Jinbe, Knight of the Sea",
        folder: "./Colored-Cover-Stories/21(751-785)/",
        altFolder: "./Colored-Cover-Stories/21(786-804)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/21.png",
        pageCount: 28,
        locked: [
            "756-colorspread_05", "764-colorspread_12", "771-colorspread_17", "775-colorspread_20", "779-colorspread_23",
            "784-colorspread_27" // UNDO once "Cover Pages (Ch. 786-804)  [Fan Requests]" done
        ]/*,
        locked: ["13-extra"]*/
    },
    {
        id: "pdf-16.5",
        type: "request",
        folder: "./Colored-Cover-Stories/21(786-804)/"
    },
    {
        id: "pdf-17",
        type: "story",
        title: "From the Decks of the World: The 500,000,000 Man Arc",
        folder: "./Colored-Cover-Stories/22(805-838)/",
        altFolder: "./Colored-Cover-Stories/22(839-862)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/22.png",
        pageCount: 25,
        locked: [
            "10_817-extra(movie-13-film-gold)", "19_829-extra(movie-13-film-gold)", /* UNDO if "#13 Film Gold" done
            = 817-colorspread_10_(movie-13-film-gold), 829-colorspread_19_(movie-13-film-gold) */
            "809-colorspread_04", "811-colorspread_05", "821-colorspread_13", "824-colorspread_15", "832-colorspread_21",
            "833-colorspread_21", "835-colorspread_22" // UNDO once "Cover Pages (Ch. 839-862)  [Fan Requests]" done
        ]/*,
        locked: ["13_820-extra"]*/
    },
    {
        id: "pdf-17.5",
        type: "request",
        folder: "./Colored-Cover-Stories/22(839-862)/"
    },
    {
        id: "pdf-18",
        type: "story",
        title: "The Stories of the Self-Proclaimed Straw Hat Grand Fleet",
        folder: "./Colored-Cover-Stories/23(864-919)/",
        altFolder: "./Colored-Cover-Stories/23(920-947)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/23.png",
        pageCount: 46,
        locked: [
            "946", // UNDO once ep911 done
            "46_945-extra(movie-14-film-stampede)" // UNDO if "#14 Film Stampede" done
            // = 945-colorspread_46_(movie-14-film-stampede)
        ],
        autoCensor: {
            manualList: [
                "46_945-extra(movie-14-film-stampede)",
                "945-colorspread_46_(movie-14-film-stampede)"
            ],
            coverStories: {
                afterPage: 32, // = 901
                    blurHeight: 29, blurHeightExceptions: {
                        30: ["45"]
                    }
            },
            coverPages: {
                afterChapter: 902,
                    blurHeight: 25, blurHeightExceptions: {
                        29: ["920"],
                        26: ["923", "926", "927", "928", "932", "933", "934", "938"]
                    },
                    spreadBlurHeight: 8, spreadBlurHeightExceptions: {
                        "right: 10": ["912-colorspread_40"]
                    }
            }
        },
        autoCensorBW: {
            manualList: [
                "46_945-extra(movie-14-film-stampede)",
                "945-colorspread_46_(movie-14-film-stampede)"
            ],
            coverStories: {
                afterPage: 32, // = 901
                    blurHeight: 27, blurHeightExceptions: {}
            },
            coverPages: {
                afterChapter: 902,
                    blurHeight: 27, blurHeightExceptions: {
                        26: ["935", "942"]
                    },
                    spreadBlurHeight: 7, spreadBlurHeightExceptions: {
                        "right: 9": ["912-colorspread_40"],
                        "6": ["941-colorspread_46"]
                    }
            }
        }
    },
    {
        id: "pdf-18.5",
        type: "request",
        folder: "./Colored-Cover-Stories/23(920-947)/"
    },
    {
        id: "pdf-19",
        type: "story",
        title: "\"Gang\" Bege's Oh My Family",
        folder: "./Colored-Cover-Stories/24(948-994)/",
        altFolder: "./Colored-Cover-Stories/24(949-985)-DELETE/", // change to 24(995-1034)
        thumbnail: "./embeds/thumbnails/Cover Stories/24.png",
        pageCount: 37,
        locked: [],
        autoCensor: {
            manualList: [
                "972-colorspread_20"
            ],
            coverStories: {
                afterPage: 0, // = 947
                    blurHeight: 29, blurHeightExceptions: {
                        26: ["34"]
                    }
            },
            coverPages: {
                afterChapter: 948,
                    blurHeight: 0, blurHeightExceptions: {
                        // TODO: once altFolder changed
                    },
                    spreadBlurHeight: 8, spreadBlurHeightExceptions: {
                        "9": ["957"],
                        "right: 6": ["967"],
                        "0": ["1000"]
                    }
            }
        },
        autoCensorBW: {
            manualList: [
                "972-colorspread_20"
            ],
            coverStories: {
                afterPage: 0, // = 947
                    blurHeight: 27, blurHeightExceptions: {}
            },
            coverPages: {
                afterChapter: 948,
                    blurHeight: 0, blurHeightExceptions: {
                        // TODO: once altFolder changed
                    },
                    spreadBlurHeight: 7, spreadBlurHeightExceptions: {
                        "8": ["957"],
                        "right: 7": ["967"],
                        "0": ["1000"]
                    }
            }
        }
    },
    {
        id: "pdf-19.5",
        type: "request",
        folder: "./Colored-Cover-Stories/24(949-985)-DELETE/" // change to 24(995-1034)
    },
    {
        id: "pdf-20",
        type: "story",
        title: "Germa 66's Ahh... An Emotionless Excursion",
        folder: "./Colored-Cover-Stories/25(1035-1078)/",
        altFolder: "./Colored-Cover-Stories/25(1079-1108)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/25.png",
        pageCount: 0,
        locked: []
    },
    {
        id: "pdf-20.5",
        type: "request",
        folder: "./Colored-Cover-Stories/25(1079-1108)/"
    },
    {
        id: "pdf-21",
        type: "story",
        title: "Oni Child Yamato's Golden Harvest Surrogate Pilgrimage",
        folder: "./Colored-Cover-Stories/26(1109-1162)/",
        altFolder: "./Colored-Cover-Stories/26(1163-)/",
        thumbnail: "./embeds/thumbnails/Cover Stories/TBD.png",
        pageCount: 0,
        locked: []
    },
    {
        id: "pdf-21.5",
        type: "request",
        folder: "./Colored-Cover-Stories/26(1163-)/"
    },
];
