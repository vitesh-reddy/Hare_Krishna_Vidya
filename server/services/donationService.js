import Donation from '../models/donationModel.js';

const saveDonation = async (donationData) => {
  try {
    const donation = new Donation(donationData);
    const savedDonation = await donation.save();
    return savedDonation;
  } catch (error) {
    throw new Error('Failed to save donation: ' + error.message);
  }
};

export { saveDonation };