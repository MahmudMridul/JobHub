using System.Net;

namespace jobhub_api.Models
{
    public class ApiResponse
    {
        public object? Data { get; set; } = null;
        public HttpStatusCode StatusCode { get; set; }
        public bool IsSuccess {  get; set; }
        public bool IsError { get; set; }
        public bool IsInfo { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}
