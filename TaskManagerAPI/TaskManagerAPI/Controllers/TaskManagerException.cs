using Microsoft.AspNetCore.Http;

namespace TaskManagerAPI.Controllers
{

    public class TaskManagerException:Exception    
    {
        public int StatusCode;
        public string Title;
        public string Msg;

        public TaskManagerException(int StatusCode, string Title, string Msg)
        {
            this.StatusCode = StatusCode;
            this.Title = Title;
            this.Msg = Msg;
        }

    }
}
