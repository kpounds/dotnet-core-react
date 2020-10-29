using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain.Models;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
  public class Login
  {
    public class Query : IRequest<AppUser>
    {
      public string Email { get; set; }
      public string Password { get; set; }
    }

    public class QueryValidator : AbstractValidator<Query>
    {
      public QueryValidator()
      {
        RuleFor(x => x.Email).NotEmpty();
        RuleFor(x => x.Password).NotEmpty();
      }
    }

    public class Handler : IRequestHandler<Query, AppUser>
    {
      private readonly UserManager<AppUser> _usermanager;
      private readonly SignInManager<AppUser> _signInManager;
      public Handler(UserManager<AppUser> usermanager, SignInManager<AppUser> signInManager)
      {
        _signInManager = signInManager;
        _usermanager = usermanager;

      }

      public async Task<AppUser> Handle(Query request, CancellationToken cancellationToken)
      {
        var user = await _usermanager.FindByEmailAsync(request.Email);

        if (user == null)
          throw new RestException(HttpStatusCode.Unauthorized);

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

        if (result.Succeeded)
        {
          // TODO: generate token for user
          return user;
        }

        throw new RestException(HttpStatusCode.Unauthorized);
      }
    }
  }
}
