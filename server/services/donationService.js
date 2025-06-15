import Donation from '../models/Donations.js';
import GroceryItem from '../models/GroceryItem.js';
import Kit from '../models/Kit.js';

const saveDonation = async (donationData) => {
  try {
    const donation = new Donation(donationData);
    const savedDonation = await donation.save();
    return savedDonation;
  } catch (error) {
    throw new Error('Failed to save donation: ' + error.message);
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

export { saveDonation, getDonationById };