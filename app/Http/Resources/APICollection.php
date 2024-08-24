<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class APICollection extends ResourceCollection
{
    public $page;
    public $limit;
    public $total;
    
    public function __construct($resource, $page = 1, $limit = 10, $total = 0)
    {
        parent::__construct($resource);
        $this->page = $page;
        $this->limit = $limit;
        $this->total = $total;
    }

    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection,
            'meta' => [
                'page' => $this->page,
                'limit' => $this->limit,
                'total' => $this->total
            ]
        ];
    }
}
