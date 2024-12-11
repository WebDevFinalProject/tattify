// creating more information for the artists after registration

export const createData = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Error fetching artists", error });
  }
};
