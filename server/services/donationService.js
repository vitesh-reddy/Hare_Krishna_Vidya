import { Campaign } from '../models/Campaign.js';
import Donation from '../models/Donations.js';
import GroceryItem from '../models/GroceryItem.js';
import Kit from '../models/Kit.js';

const saveDonation = async (donationData) => {
  try {
    // Save the donation first
    const donation = new Donation(donationData);
    const savedDonation = await donation.save();
    return savedDonation;
  } catch (error) {
    throw new Error('Failed to save donation: ' + error.message);
  }
};

const saveCampaignDonation = async (campaignId, donationData) => {
  try {
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    // Push donation data into the embedded donations array
    campaign.donations.push(donationData);

    // Optionally update raisedAmount
    if (donationData.amount) {
      campaign.raisedAmount = (campaign.raisedAmount || 0) + donationData.amount;
    }

    // Save the campaign with the new donation
    await campaign.save();

    return { success: true, message: 'Donation saved successfully' };
  } catch (error) {
    throw new Error('Failed to save campaign donation: ' + error.message);
  }
};


const getDonationById = async (donationId) => {
  try {
    const donation = await Donation.findById(donationId).lean(); // lean() helps inspect plain data

    // Manually populate each item since dynamic refPath inside arrays can be unreliable
    const populatedItems = await Promise.all(
      donation.items.map(async (item) => {
        let populatedItem = null;

        if (item.itemType === 'Kit') {
          populatedItem = await Kit.findById(item.itemId).lean();
        } else if (item.itemType === 'GroceryItem') {
          populatedItem = await GroceryItem.findById(item.itemId).lean();
        }

        return {
          ...item,
          populatedItem, // attach the actual document as `populatedItem`
        };
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