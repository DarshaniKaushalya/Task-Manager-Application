using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.Models
{
    public class TasksModel
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [StringLength(100, ErrorMessage = "Title cannot exceed 100 characters")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters")]
        public string Description { get; set; }

        [Required(ErrorMessage = "DueDate is required")]
        [DataType(DataType.Date, ErrorMessage = "Invalid DueDate format")]
        public DateTime DueDate { get; set; }
    }
}
