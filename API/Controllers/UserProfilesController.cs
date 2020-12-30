using System.Threading.Tasks;
using Application.Profiles.Queries;
using Domain.Objects;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class UserProfilesController : BaseController
  {
    [HttpGet("{username}")]
    public async Task<ActionResult<UserProfile>> Get(string username)
    {
      return await Mediator.Send(new Details.Query { Username = username });
    }
  }
}
