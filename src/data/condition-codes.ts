export type ConditionCategory =
  | "Lawn Quality"
  | "Weeds"
  | "Diseases"
  | "Pests"
  | "Cultural / Mowing"
  | "Recommendations"
  | "Visit Notes"
  | "Access"
  | "Weather";

export interface ConditionCode {
  /** Stored exactly as it appears in the customer system, including trailing
   *  spaces (e.g. "AN ", "RT "). The trailing space is part of the real code. */
  code: string;
  /** Trimmed version for display / search. */
  displayCode: string;
  description: string;
  category: ConditionCategory;
  /** Email body that goes out to the customer in the after-service email. */
  customerEmail?: string;
}

export const conditionCategories: readonly ConditionCategory[] = [
  "Lawn Quality",
  "Weeds",
  "Diseases",
  "Pests",
  "Cultural / Mowing",
  "Recommendations",
  "Visit Notes",
  "Access",
  "Weather",
] as const;

const c = (
  code: string,
  description: string,
  category: ConditionCategory,
  customerEmail?: string,
): ConditionCode => ({
  code,
  displayCode: code.trim(),
  description,
  category,
  customerEmail: customerEmail && customerEmail.length > 0 ? customerEmail : undefined,
});

// Source: ParameterReports_Condition_Codes export, 29 Apr 2026.
// Punctuation cleaned (full stops vs. commas) but wording preserved.
export const conditionCodes: ConditionCode[] = [
  c("5* ", "5* Lawn - Looks Perfect", "Lawn Quality"),
  c(
    "AAA",
    "Recommend Annual Aeration",
    "Recommendations",
    "Aeration is massively beneficial to the health of a lawn. This essential process allows water, moisture and nutrients to reach the roots easier, encourages denser root development and helps to relieve compaction. We recommend that your lawn is aerated at least once in the autumn. Check our website for more details on the benefits: https://www.shrekfeet.com/lawn-care/aeration",
  ),
  c(
    "AAS",
    "Recommend Annual Aeration",
    "Recommendations",
    "Aeration is massively beneficial to the health of a lawn. This essential process allows water, moisture and nutrients to reach the roots easier, encourages denser root development and helps to relieve compaction. We recommend that your lawn is aerated at least once in the spring. Check our website for more details on the benefits: https://www.shrekfeet.com/lawn-care/aeration",
  ),
  c(
    "AMG",
    "Annual Meadow Grass",
    "Weeds",
    "This is an unattractive broad-leaf grass weed. If left unmanaged, this can spread in your lawn and easily outcompete other grass varieties. Ensure you don't allow it to spread and set seed by mowing off any seed heads or removing the plant from the lawn by hand.",
  ),
  c(
    "AN ",
    "Anthracnose",
    "Diseases",
    "This is a fungal disease that causes stem rot and foliar blight. This can be caused by several factors including poor airflow, excessive thatch, compacted soil, drought conditions or incorrect mowing. This disease can cause serious grass die-back if left untreated and may encourage the ingress of weeds and moss. We highly recommend improving cultural practices and environmental conditions where possible. We offer a treatment to help grass recover and also preventative fungicide treatments to aim to prevent return of the disease for a short period. Whilst the disease is active, it is advised to wash your mower blades after each cut to help prevent the disease from spreading more rapidly.",
  ),
  c(
    "AP ",
    "Ants Present",
    "Pests",
    "Ants will not damage your grass plants, but they will affect the level of your lawn and an uneven surface can result in scalping when you mow. We recommend raising your mower height and treating the ant hills with Ant Stop granules. These granules can be mixed with luke warm water and applied as a drench to each ant colony. Beware never to pour boiling water onto your lawn, as this will scorch and kill the grass. Scarification will help to reduce the height of any ant hills. Over-seeding will repair bare areas and top-dressing can help to manage uneven lawn issues. Please ask us for more details.",
  ),
  c(
    "ASA",
    "Recommend Annual Scarification",
    "Recommendations",
    "Scarification is a key process in lawncare and can benefit your lawn in a number of ways. We recommend that your lawn is scarified at least once annually in the autumn to help maintain healthy grass growth, control thatch accumulation and remove moss regularly. Check out this article on our website for more information: https://www.shrekfeet.com/blog/scarification-what-is-it-and-why-does-it-matter",
  ),
  c(
    "ASS",
    "Recommend Annual Scarification",
    "Recommendations",
    "Scarification is a key process in lawncare and can benefit your lawn in a number of ways. We recommend that your lawn is scarified at least once annually in the spring to help maintain healthy grass growth, control thatch accumulation and remove moss regularly. Check out this article on our website for more information: https://www.shrekfeet.com/blog/scarification-what-is-it-and-why-does-it-matter",
  ),
  c(
    "BA ",
    "Bare Spots",
    "Lawn Quality",
    "There are some bare areas in your lawn. These provide the perfect growing environment for weeds and moss to develop. We recommend over-seeding this with a more suitable grass blend to fill in the gaps.",
  ),
  c("BFT", "Birds-foot Trefoil", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("BMK", "Black Medick", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("BW ", "Bindweed", "Weeds", "This tenacious weed can be challenging to totally eradicate. Regular weed control treatments will help to reduce the spread of this weed."),
  c("CB ", "Crane's-Bill", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("CBC", "Creeping Buttercup", "Weeds", "This tenacious weed can be challenging to totally eradicate. It is often an indicator of waterlogged lawns. Regular weed control treatments will help to reduce the spread of this weed."),
  c("CF ", "Coarse Fescue", "Weeds", "This is an unattractive broad-leaf grass weed. If left unmanaged, this can spread in your lawn and easily outcompete other grass varieties. Ensure you don't allow it to spread and set seed by mowing off any seed heads or removing the plant from the lawn."),
  c("CHK", "Chickweed", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("CL ", "Clover", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("CLL", "Complex Lawn Layout", "Visit Notes"),
  c("CNH", "*Customer Not Home", "Visit Notes"),
  c("CQF", "Cinquefoil", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("DA ", "Dandelions", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("DAI", "Daisy", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("DB ", "Dull Mower Blades", "Cultural / Mowing", "Mower blades that are not sharp can tear grass, rather than cutting it cleanly. As a result, torn tips do not heal properly and can turn white or brown. Like an open wound, this can lead to issues with disease, if not resolved soon. Often overlooked, it is important to sharpen your mower's blades at least twice a year — ideally monthly."),
  c("DD ", "Dog Damage", "Lawn Quality", "There are areas in your lawn that have been damaged by dog digging and trampling. The damaged areas leave space for moss and weeds to develop. We recommend over-seeding the lawn to help manage this activity."),
  c("DL ", "Dollar Spot", "Diseases", "This is a fungal disease that can kill grass plants. It is more common in turf that is mowed short. This can be caused by several factors including poor airflow, excessive thatch, compacted soil, drought conditions or incorrect mowing. This disease can cause serious grass die-back if left untreated and may encourage the ingress of weeds and moss. We highly recommend improving cultural practices and environmental conditions where possible. We offer a treatment to help grass recover and also preventative fungicide treatments to aim to prevent return of the disease for a short period. Whilst the disease is active, it is advised to wash your mower blades after each cut to help prevent the disease from spreading more rapidly."),
  c("DS ", "Drought Stress", "Lawn Quality", "Your lawn is currently suffering from water deficiency. Like all living things, grass needs water to survive. Without it, grass will suffer and die as a result. We highly recommend watering your lawn regularly and in periods of drought. Watering once weekly in periods of drought is far cheaper than covering the cost of lawn repair later. View our website for advice and guides on watering. We also provide our Drench wetting agent treatments that reduce the need for watering as often, retain moisture in the rootzone for longer and aim to reduce the risk of drought stress."),
  c("DT ", "Spoke To Daughter", "Visit Notes"),
  c("DU ", "Dog Urine Damage", "Lawn Quality", "There are areas in your lawn that have been affected by dog urine. This can scorch and kill grass, leaving areas of bare soil where weeds and moss can establish, making for an unsightly lawn. Over-seeding your lawn with a suitable seed blend will repair these areas and keep your lawn looking great."),
  c("FP ", "Fusarium Patch", "Diseases", "This is a fungal disease that can kill grass plants and be dangerously devastating to lawns if left unmanaged. This can be caused by several factors including poor airflow, excessive thatch, compacted soil, drought conditions or incorrect mowing. This disease can cause serious grass die-back if left untreated and may encourage the ingress of weeds and moss. We highly recommend improving cultural practices and environmental conditions where possible. We offer a treatment to help grass recover and also preventative fungicide treatments to aim to prevent return of the disease for a short period. Whilst the disease is active, it is advised to wash your mower blades after each cut to help prevent the disease from spreading more rapidly."),
  c("FR ", "Fairy Ring", "Diseases", "This is an airborne fungal disease that is harmless to grass plants; however, the mycelium produced by this fungi is water-repellent and can cause hydrophobic soil. These properties create brown or dark-green arcs/circles in lawns, sometimes accompanied by toadstools. A combination of regular aeration and wetting agent applications can help control this fungi."),
  c("FW ", "Field Woodrush", "Weeds", "This appears as a tufted weed grass with broad, dark-green leaves, often coated with long, silky, white hairs. If left unmanaged, this can spread in your lawn. Ensure you don't allow it to spread and set seed by mowing off any seed heads or removing the plant from the lawn."),
  c("GA ", "Garage Access", "Access"),
  c("GD ", "Spoke To Gardener", "Visit Notes"),
  c("GI ", "Ground Ivy", "Weeds", "This tenacious weed can be challenging to totally eradicate. Regular weed control treatments will help to reduce the spread of this weed."),
  c("GM ", "Good Mowing", "Cultural / Mowing", "You are doing a wonderful job of mowing. As a result, your lawn looks uniform and you are encouraging healthy growth. Keep up the good work!"),
  c("GR ", "Chafer Grubs", "Pests", "Chafer Grubs are the soil-dwelling larvae of Chafer Beetles (May Bug). They are a lawn pest that feed on the roots of grass plants and can cause significant, long-term damage to lawns. Depending on the species of Chafer Grub, they can live in your lawn for up to four years. This is a very important issue that can result in total lawn loss and must not be ignored. We offer a grub control treatment plan that is designed to manage this pest, ranging from our Grub X service to Nematode applications."),
  c("GTL", "Grass Too Long", "Cultural / Mowing", "The correct mowing regime is essential for an attractive lawn. Leaving grass to grow really long, then cutting very short stresses grass and can lead to issues with disease and bare areas. Mow often enough that you are only removing a third/quarter of the leaf blade each time you cut. For more information, check out our mowing guide on our website: https://www.shrekfeet.com/blog/lawn-mowing-made-easy"),
  c("GTS", "Grass Too Short", "Cultural / Mowing", "The correct mowing regime is essential for an attractive lawn. Mowing your lawn too short, where the grass species cannot tolerate close mowing, can result in dieback and issues with drought stress, moss and weeds. Raising your mowing height will be of great benefit to lawn health. For more information, check out our mowing guide on our website: https://www.shrekfeet.com/blog/lawn-mowing-made-easy"),
  c("HGC", "Heavy Grass Clippings", "Cultural / Mowing", "Leaving thick, long and heavy grass clippings on your lawn will damage your grass. Mulch mowing is highly beneficial, however only when you mow often enough that you are producing tiny clippings that can fall into the sward easily. We recommend using a leaf blower to remove the existing clippings, raking them together or using the grass box on your mower to pick them up."),
  c("HK ", "Spoke To Housekeeper", "Visit Notes"),
  c("HKW", "Hawkweed", "Weeds", "Often confused with Dandelions, this weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("HT ", "Heavy Thatch", "Lawn Quality", "Thatch is the natural build-up of organic matter. A little thatch is perfectly healthy, however excessive levels of thatch can pose a serious problem. Your lawn has produced a high level of thatch that is negatively affecting the health of your lawn. Your grass is more likely to suffer from disease, drought stress and lack of nutrition due to this issue. We highly recommend scarification to reduce the levels of thatch and allow moisture, nutrients and air to reach the soil surface. This will ensure a healthier lawn, which is more resistant to these issues."),
  c("HW ", "Heavy Weeds", "Weeds", "Your lawn has a heavy infestation of many different weed species. We use a range of weed control products with different active ingredients over the course of our treatment plan seasonal visits. As we work through our annual lawn treatment plan, we will begin to eradicate these weeds. Please bear with us as this does take time."),
  c("LA*", "*Carried Out Lawn Assessment", "Visit Notes", "Today, your lawn technician has identified any areas of concern in your lawn, documenting the status of its current condition, whilst evaluating and reporting on the progression of your lawn seasonally. This helps us to provide you with a service that is more specific to the needs of your lawn, and you as our valued customer. For further advice email: lawns@shrekfeet.com"),
  c("LC ", "Lawn Compacted", "Lawn Quality", "Compaction can have a serious impact on the condition of your lawn. This prevents essential processes such as water drainage and root development. This can lead to issues with waterlogging, restricted grass growth and diseases. We highly recommend that your lawn is aerated to relieve compaction. Check our website for more details on the benefits: https://www.shrekfeet.com/lawn-care/aeration"),
  c("LCD", "Lesser Celandine", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("LE ", "Leaves On Lawn", "Lawn Quality", "Leaves left on your lawn for an extended period of time will inevitably result in grass die back, more weeds, moss and an increased risk of disease. Remove leaves weekly during their falling season."),
  c("LJ ", "Leather Jackets", "Pests", "Leather Jackets are the larvae of the Crane Fly (Daddy Longlegs). They are a lawn pest that feed on the stems and roots of grass plants and can cause significant damage to lawns in a very short period of time. These grubs live in the soil for up to one year, however the adult crane flies do not travel far and often tend to re-lay eggs in the same location. This is a very important issue that can result in total lawn loss and must not be ignored. We offer a grub control treatment plan that is designed to manage this pest."),
  c("LS ", "Leaf Spot", "Diseases", "This is a fungal disease that causes lesions on grass blades, discolouration and sometimes dieback, depending on the severity of the infection. The effects of this disease can look unsightly and are often confused with drought stress. It is usually caused by high temperatures, moist conditions and incorrect mowing practices. We offer a treatment to help grass recover and also preventative fungicide treatments to aim to prevent return of the disease for a short period. Whilst the disease is active, it is advised to wash your mower blades after each cut to help prevent the disease from spreading more rapidly."),
  c("LSC", "Lawn Size Correct", "Visit Notes"),
  c("LSI", "Lawn Size Incorrect & Adjusted", "Visit Notes"),
  c("MBC", "Meadow Buttercup", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("ML ", "Mossy Lawn", "Lawn Quality", "Moss in a lawn is perfectly natural, especially where environmental conditions support its growth. An excessive build-up of moss can pose a serious threat to your lawn. This poor grass plant growth may encourage weeds, pests and diseases. Without the correct cultural practices and immediate remedial action, moss can quickly spread and take over your lawn. We highly recommend that your lawn is scarified to reduce the amount of moss and protect the health of your lawn. Check out our website for more advice: https://www.shrekfeet.com/lawn-care/moss-control"),
  c("MO ", "Moles Present", "Pests", "Moles can cause significant and unsightly lawn damage — please contact your local pest controller for help, if you have not done so already."),
  c("MR ", "Spoke To Mr.", "Visit Notes"),
  c("MS ", "Spoke To Mrs.", "Visit Notes"),
  c("MYO", "Mind Your Own Business", "Weeds", "Mind Your Own Business (Soleirolia) is a difficult lawn weed to control and you should make every effort to prevent its spread into your lawn. Regular weed control treatments will help to reduce the spread of this weed, however we encourage regular self maintenance to prevent this from entering a lawn, as it can be challenging to eradicate."),
  c("NA ", "Narrow Access", "Access"),
  c("NM ", "Not Mowing Often Enough", "Cultural / Mowing", "Your lawn looks like it would benefit from being mowed more frequently. Mowing is one of the most important aspects of lawncare and will encourage thicker, healthier growth and a denser sward. If you can perfect your mowing, you are halfway to a beautiful lawn. Try to mow at least weekly through the growing season from March to November. Check out our mowing guide on our website: https://www.shrekfeet.com/blog/lawn-mowing-made-easy"),
  c("NP*", "*No Problems", "Visit Notes"),
  c("NRS", "Necrotic Ring Spot", "Diseases", "This is a rare, soil-dwelling fungal disease in the UK that causes root and stem rot. It presents itself in the form of brown rings and can often be confused with pest problems and other lawn diseases. It is typically caused by conditions such as poorly aerated soil and drought. We highly recommend regular aeration and wetting agent treatments, as well as improving your watering regime. You can find our watering guide on our website."),
  c("OX ", "Oxalis", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("PL ", "Plantain", "Weeds", "This weed is often an indicator of compacted soil. Regular aeration will aid to prevent reoccurrence of this weed."),
  c("PM ", "Powdery Mildew", "Diseases", "This is a fungal disease that can look unsightly and prevent your grass from photosynthesising efficiently. It presents itself in the form of a white, powdery substance, similar to talcum powder. It is usually a sign of poor air circulation, too much shade and high humidity. A plan to improve cultural practices is recommended, as well as environmental conditions where possible. This includes mowing and watering regimes — take a look at our website for guides on this. Whilst the disease is active, it is advised to wash your mower blades after each cut to help prevent the disease from spreading more rapidly."),
  c("PP ", "Parsley-Piert", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("PW ", "Pearlwort", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("RAF", "*Raise A Flag", "Visit Notes"),
  c("RAG", "Ragwort", "Weeds", "This weed will be controlled through regular weed control applications. This weed is poisonous and can be fatal to animals, livestock and pasture animals, if ingested in high quantities."),
  c("RDD", "*Raining During - Drizzle", "Weather"),
  c("RDH", "*Raining During - Heavy", "Weather"),
  c("RDN", "Red Dead-Nettle", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("RKC", "Property Requires Key/Code", "Access"),
  c("ROA", "Ride-On Access Available", "Access"),
  c("RT ", "Red Thread Active", "Diseases", "This is a common fungal disease that can look unsightly and ruin the appearance of a lawn if left untreated. It rarely kills grass plants, however the straw-coloured scarring of dead grass leaves can be very unsightly. It can live in the soil for up to two years and can reoccur without appropriate action. This fungal disease typically occurs in lawns that suffer from excessive thatch buildup, poor air circulation and compaction. Humid conditions also increase the probability of occurrence. Your lawn would benefit from improved cultural practices. Ensure you have the correct mowing and watering regime — stressed plants are more likely to suffer attack. We offer treatment to help combat this disease, and also preventative fungicide treatments to aim to prevent return of the disease for a short period. Whilst the disease is active, it is advised to wash your mower blades after each cut to help prevent the disease from spreading more rapidly. Certain grass types are particularly susceptible to red thread and therefore over-seeding the lawn with more resistant varieties will often reduce the problem."),
  c("RTS", "Red Thread Scarring", "Diseases", "Your lawn is currently showing signs of scarring from a fungal disease called Red Thread. The disease is not currently active; however, preventative action should be taken so that your lawn is protected next year. We provide preventative fungicide treatments to aim to combat this disease from returning. The grass usually recovers on its own, however this does take time and we offer a curative treatment that helps grass to recover quicker and return back to good health sooner."),
  c("RU ", "Rust", "Diseases", "This is an airborne fungal disease that causes yellowing of grass plants. Rust itself does not pose a threat to your lawn, however this can open the door to other diseases and issues by weakening the grass plant's ability to photosynthesise. It is recommended to mow regularly to reduce the number of affected leaves, removing the clippings, and to attempt to improve air circulation where possible. Whilst the disease is active, it is advised to wash your mower blades after each cut to help prevent the disease from spreading more rapidly."),
  c("SA ", "Seeded Areas for Free", "Visit Notes", "As part of our aim to delight every customer we have added some seed to your lawn today without any additional charge. Please recommend us to your friends and family."),
  c("SH ", "Selfheal", "Weeds", "This tenacious weed can be challenging to totally eradicate. Regular weed control treatments will help to reduce the spread of this weed."),
  c("SN ", "Spoke To Son", "Visit Notes"),
  c("SP ", "Spurge", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("SPM", "Spotted Medick", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("SPW", "Speedwell", "Weeds", "This tenacious weed can be challenging to totally eradicate. Regular weed control treatments will help to reduce the spread of this weed."),
  c("SS ", "Steep Steps / 2 Tech Reno", "Access"),
  c("TAP", "Take All Patch", "Diseases", "This is a challenging, soil-dwelling fungal disease that causes root rot of grass plants. This can be caused by several factors including poor airflow, excessive thatch, compacted soil, drought conditions or incorrect mowing. This disease can cause serious grass die-back if left untreated and may encourage the ingress of weeds and moss. We highly recommend improving cultural practices and environmental conditions where possible. Grass that has been affected by this disease will need to be scarified and overseeded to recover."),
  c("TD ", "Recommend Top-Dressing", "Recommendations", "Your lawn would benefit from being top-dressed. This helps to boost microbial activity in the soil by adding a nutrient-rich layer of lawn dressing to the surface of your lawn to create healthier growing conditions. Success rates of new grass seed germination will also be significantly improved, creating the perfect seed bed."),
  c("TH ", "Thistles", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("TMS", "Too Much Shade", "Lawn Quality", "A shaded lawn is more likely to suffer from issues with moss and poor plant growth. Where possible, we recommend reducing the levels of shade by cutting back overhanging branches, trees and shrubs to allow more light on the lawn. If this is not possible, then we advise to overseed the lawn with more suitable grass varieties that are more tolerant of shaded conditions."),
  c("UP ", "Unknown Lawn Problem", "Visit Notes"),
  c("VH ", "Very Hot / Dry Day", "Weather"),
  c("W  ", "Waterlogged", "Lawn Quality", "Waterlogging is caused by a number of factors, such as heavy foot traffic, excess organic matter, poor root development, compaction or a high water table. Waterlogging can cause root rot and grass death. We recommend that your lawn receives extra care and attention through mechanical processes such as aeration. Your lawn will likely need seeding when appropriate to do so to replace any grass plants that dieback."),
  c("WI ", "Windy During Application", "Weather"),
  c("WV ", "Wild Violets", "Weeds", "This weed will be controlled through regular weed control applications. Some common lawn weeds may require multiple weed control treatments to fully manage."),
  c("WW ", "Well Watered", "Cultural / Mowing", "You are doing a superb job of watering your lawn. We are always really pleased to visit a lawn that has clearly been irrigated. By doing so, you are aiding your lawn's health and strength, which in turn reduces the risk of drought stress and disease. Always remember, it is far cheaper to water your lawn in times of drought than it is to cover the cost of a lawn repair later. Keep up the good work!"),
  c("YA ", "Yarrow", "Weeds", "This challenging weed indicates poor soil conditions and lawns that are often too dry in summer. It can be controlled, but takes a little time and often multiple lawn weed treatments. This can sometimes be challenging to totally eradicate. A plan to improve soil structure and quality is recommended."),
];

export const getConditionCode = (displayCode: string) =>
  conditionCodes.find((cc) => cc.displayCode === displayCode);
