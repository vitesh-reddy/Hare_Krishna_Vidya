import { Campaign } from '../models/Campaign.js';
import Donation from '../models/Donations.js';
import GroceryItem from '../models/GroceryItem.js';
import Kit from '../models/Kit.js';

const saveDonation = async (donationData) => {
  try {
    const donation = new Donation(donationData);
    return await donation.save();
  } catch (error) {
    if (error.code === 11000)
      return null;
    throw error;
  }
};


const saveCampaignDonation = async (campaignId, donationData) => {
  try {
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    campaign.donations.push(donationData);

    if (donationData.amount)
      campaign.raisedAmount = (campaign.raisedAmount || 0) + donationData.amount;

    await campaign.save();

    return { success: true, message: 'Donation saved successfully' };
  } catch (error) {
    throw new Error('Failed to save campaign donation: ' + error.message);
  }
};


const getDonationById = async (donationId) => {
  try {
    const donation = await Donation.findById(donationId).lean();

    const populatedItems = await Promise.all(
      donation.items.map(async (item) => {
        let populatedItem = null;

        if (item.itemType === 'Kit')
          populatedItem = await Kit.findById(item.itemId).lean();
        else if (item.itemType === 'GroceryItem')
          populatedItem = await GroceryItem.findById(item.itemId).lean();

        return { ...item, populatedItem };
      })
    );

    donation.items = populatedItems;
    console.log(JSON.stringify(donation, null, 2));
    return donation;
  } catch (err) {
    console.error('Error:', err.message);
    return null;
  }
};

export { saveDonation, saveCampaignDonation, getDonationById };