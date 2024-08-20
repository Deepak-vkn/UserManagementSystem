import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  // Check if JWT_SECRET is defined
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    // Generate the token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    // Log the generated token for debugging
    console.log('Generated JWT token:', token);

    // Set the token as an HTTP-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Confirm the cookie setting
    console.log('JWT token set in cookie successfully');
  } catch (error) {
    // Handle any errors during token generation
    console.error('Error generating token:', error);
    throw new Error('Could not generate token');
  }
};

export default generateToken;
