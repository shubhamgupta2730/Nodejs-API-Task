

const checkAge = async (req, res) => {
  try {
    const { dateOfBirth } = req.body;
    const presentTime = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = presentTime.getFullYear() - birthDate.getFullYear();

    if (presentTime.getMonth() < birthDate.getMonth()) {
      age--;
    } else if (presentTime.getMonth() === birthDate.getMonth() && presentTime.getDate() < birthDate.getDate()) {
      age--;
    }


    res.json({ age });
  } catch (error) {
    res.status(400).send('Error in calculating age: ' + error.message);
  }
}

module.exports = {
  checkAge
}