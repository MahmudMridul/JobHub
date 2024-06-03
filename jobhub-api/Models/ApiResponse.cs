using System.Net;

namespace jobhub_api.Models
{
    public class ApiResponse
    {
        public object? Data { get; set; } = null;
        public HttpStatusCode StatusCode { get; set; }
        public bool IsSuccess {  get; set; } = false;
        public bool IsError { get; set; } = false;
        public bool IsInfo { get; set; } = false;
        public string Message { get; set; } = string.Empty;
    }
}
