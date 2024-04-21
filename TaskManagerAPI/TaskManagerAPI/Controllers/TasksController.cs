using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Threading.Tasks;
using TaskManagerAPI.Data;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : Controller
    {
        private readonly TaskManagerDbContext _taskManagerDbContext;

        public TasksController(TaskManagerDbContext taskManagerDbContext)
        {
            _taskManagerDbContext = taskManagerDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            var taskList = await _taskManagerDbContext.Tasks.ToListAsync();
            if (taskList == null)
            {
                throw new TaskManagerException(400, "Validation error", "Get All Tasks: Cannot get all tasks.");
            }
            return Ok(taskList);
        }


        [HttpPost]
        public async Task<IActionResult> AddTask([FromBody] TasksModel taskRequest)
        {
            try
            {
                taskRequest.Id = Guid.NewGuid();

                taskRequest.DueDate = TimeZoneInfo.ConvertTimeFromUtc(taskRequest.DueDate, TimeZoneInfo.FindSystemTimeZoneById("Asia/Colombo"));

                await _taskManagerDbContext.Tasks.AddAsync(taskRequest);
                await _taskManagerDbContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetTask), new { id = taskRequest.Id }, null);
            }
            catch (Exception ex)
            { 
                return BadRequest(new { message = "Failed to add task", error = ex.Message });
            }
        }


        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetTask(Guid id)
        {
            var task = await _taskManagerDbContext.Tasks.FirstOrDefaultAsync(x => x.Id == id);

            if (task == null)
            {
                throw new TaskManagerException(404, "Get Task: Task not found", $"Task with id {id} not found.");
            }

            return Ok(task);
        }


        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateTask([FromRoute] Guid id, TasksModel updateTaskRequest)
        {
            var task = await _taskManagerDbContext.Tasks.FindAsync(id);

            updateTaskRequest.DueDate = TimeZoneInfo.ConvertTimeFromUtc(updateTaskRequest.DueDate, TimeZoneInfo.FindSystemTimeZoneById("Asia/Colombo"));

            if (task == null)
            {
                throw new TaskManagerException(404, "Update: Task: Task not found", $"Task with id {id} not found.");
            }

            task.Title = updateTaskRequest.Title;
            task.Description = updateTaskRequest.Description;
            task.DueDate = updateTaskRequest.DueDate;

            await _taskManagerDbContext.SaveChangesAsync();

            return Ok(task);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteTask([FromRoute] Guid id)
        {
            var task = await _taskManagerDbContext.Tasks.FindAsync(id);

            if (task == null)
            {
                throw new TaskManagerException(404, "Delete Task: Task: Task not found", $"Task with id {id} not found.");
            }
            _taskManagerDbContext.Tasks.Remove(task);

            await _taskManagerDbContext.SaveChangesAsync();

            return Ok(task);
        }
    }
}

