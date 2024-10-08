"use server"

import { CreateBookmarkParams, CreatePackagesParams, DeleteBookmarkParams, DeleteCategoryParams, DeletePackagesParams, UpdatePackagesParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Category from "../database/models/category.model"
import { revalidatePath } from "next/cache"
import { UTApi } from "uploadthing/server"
import Packages from "../database/models/packages.model"
import Bookmark from "../database/models/bookmark.model"
import Ad from "../database/models/ad.model"


const populateAd = (query: any) => {
  return query.populate({
    path: 'adId',
    model: Ad,
    select: '_id title description imageUrls negotiable enableMap latitude longitude geometry address youtube phone subcategory views price make vehiclemodel vehicleyear vehiclecolor vehicleinteriorColor vehiclecondition vehiclesecordCondition vehicleTransmissions vehiclemileage vehiclekeyfeatures vehiclechassis vehicleregistered vehicleexchangeposible vehicleFuelTypes vehicleBodyTypes vehicleSeats vehicleEngineSizesCC Types bedrooms bathrooms furnishing amenities toilets parking status area landuse propertysecurity floors estatename houseclass listedby fee category organizer plan priority expirely adstatus createdAt'
  });
};


export const createBookmark = async ({ bookmark, path}: CreateBookmarkParams) => {
  try {
    await connectToDatabase();
    const conditions = { adId: bookmark.adId }
    const book = await Bookmark.find(conditions);
    let newBookmark={}
    let response="Ad aleardy Saved to Bookmark"
    if(!book){
       newBookmark = await Bookmark.create({ ...bookmark});
       response="Ad Saved to Bookmark"
    }
    
    revalidatePath(path)
    return response;
  } catch (error) {
    handleError(error)
  }
}
// GET ONE Ad BY ID
export async function getBookmarkById(_id: string) {
  try {
    await connectToDatabase()

    const bookmark = await Bookmark.findById(_id)

    if (!bookmark) throw new Error('Bookmark not found')

    return JSON.parse(JSON.stringify(bookmark))
  } catch (error) {
    handleError(error)
  }
}
export async function getallBookmarkByuserId(userId: string, limit = 16, page = 1) {
  try {
    await connectToDatabase();
    const conditions = { userBId: userId }
    const skipAmount = (Number(page) - 1) * limit
   // const bookmark = await Bookmark.find(conditions);
   const bookmark = await populateAd(Bookmark.find(conditions)
   .skip(skipAmount)
   .limit(limit));
   const AdCount = await Bookmark.countDocuments(conditions)

   return { data: JSON.parse(JSON.stringify(bookmark)), totalPages: Math.ceil(AdCount / limit) }
  } catch (error) {
    handleError(error)
  }
}
// UPDATE

// DELETE
export async function deletePackage({ _id, path }: DeleteBookmarkParams) {
  try {
    await connectToDatabase()

    const deletedBookmark = await Bookmark.findByIdAndDelete(_id)
    // Delete image from uploadthing
    if (deletedBookmark) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}


