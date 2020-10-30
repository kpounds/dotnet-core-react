using Application.Interfaces;
using Domain.Models;

namespace Infrastructure.Security
{
  public class JwtGenerator : IJwtGenerator
  {
    public string CreateToken(AppUser user)
    {
      throw new System.NotImplementedException();
    }    
  }
}
