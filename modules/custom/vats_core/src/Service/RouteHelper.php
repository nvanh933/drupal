<?php

namespace Drupal\vats_core\Service;

use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\node\NodeInterface;

/**
 * Service providing helper methods for route and node information.
 */
class RouteHelper {

  /**
   * The current route match.
   *
   * @var \Drupal\Core\Routing\RouteMatchInterface
   */
  protected $routeMatch;

  /**
   * Constructs a new RouteHelper object.
   *
   * @param \Drupal\Core\Routing\RouteMatchInterface $route_match
   *   The current route match.
   */
  public function __construct(RouteMatchInterface $route_match) {
    $this->routeMatch = $route_match;
  }

  /**
   * Returns the current route name.
   *
   * @return string
   *   The route name.
   */
  public function getRouteName(): string {
    return $this->routeMatch->getRouteName();
  }

  /**
   * Returns the node entity from current route, or NULL.
   *
   * @return \Drupal\node\NodeInterface|null
   *   The node entity, or NULL if not on a node route.
   */
  public function getRouteNode(): ?NodeInterface {
    $node = $this->routeMatch->getParameter('node');

    return $node instanceof NodeInterface ? $node : NULL;
  }

}
