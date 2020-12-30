using System.Threading.Tasks;
using Application.Photos.Commands;
using Domain.Objects;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class PhotosController : BaseController
  {
    [HttpPost]
    public async Task<ActionResult<Photo>> Add([FromForm] Add.Command command)
    {
      return await Mediator.Send(command);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Unit>> Delete(string id)
    {
      return await Mediator.Send(new delete.Command { Id = id });
    }

    [HttpPost("{id}/setmain")]
    public async Task<ActionResult<Unit>> SetMain(string id)
    {
      return await Mediator.Send(new SetMain.Command { Id = id });
    }
  }
}
