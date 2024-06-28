const checkAge = async (req, res) => {
  try {
    const { dateOfBirth } = req.body;

    if (!dateOfBirth) {
      return res.status(400).json({ message: 'Missing dateOfBirth field' });
    }

    const presentTime = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = presentTime.getFullYear() - birthDate.getFullYear();

    if (presentTime.getMonth() < birthDate.getMonth() ||
        (presentTime.getMonth() === birthDate.getMonth() && presentTime.getDate() < birthDate.getDate())) {
      age--;
    }

    res.json({ age });
  } catch (error) {
    res.status(400).json({ message: 'Error in calculating age', error: error.message });
  }
};

module.exports = {
  checkAge
};
