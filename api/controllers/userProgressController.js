// Check if lesson is completed for a user
exports.checkLessonCompletion = async (req, res) => {
    try {
      const { userId, lessonId } = req.query;
  
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(lessonId)) {
        return res.status(400).json({
          success: false,
          errorMessage: "Invalid user ID or lesson ID format"
        });
      }
  
      const progress = await UserProgress.findOne({ 
        userId: new mongoose.Types.ObjectId(userId),
        lessonId: new mongoose.Types.ObjectId(lessonId) 
      });
  
      res.json({
        success: true,
        isCompleted: !!progress?.completed
      });
  
    } catch (err) {
      console.error('Error checking lesson completion:', err);
      res.status(500).json({
        success: false,
        errorMessage: "Server error"
      });
    }
  };